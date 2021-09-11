import { StatusCodes } from '@enums/StatusCodes'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import databaseMiddleware from 'server/middlewares/database'
import { Mongoose } from 'mongoose'
import ProductModel from 'server/models/product.model'
import { getTokenFromCookie } from 'server/utils/token'
import isAuthenticatedMiddleware from '@middlewares/isAuthenticated'

const handler = nc()
  .use(databaseMiddleware, isAuthenticatedMiddleware)
  .post(
    async (
      req: NextApiRequest & {
        db: Mongoose
        seller: { _id: any; email: string }
      }, // db is coming from the databaseMiddleware
      res: NextApiResponse
    ) => {
      try {
        const { name, image, description, price } = req.body

        console.log(req.seller)

        const product = await new ProductModel({
          name,
          image_url: image,
          description,
          price,
          seller: req.seller._id,
        }).save()

        res.status(StatusCodes.CREATED).json({
          message: 'Product created successfully',
          product,
        })
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Cannot add a product moment',
        })
      }
    }
  )

export default handler
