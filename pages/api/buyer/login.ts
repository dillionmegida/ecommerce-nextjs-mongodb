import { StatusCodes } from '@enums/StatusCodes'
import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import middleware from 'server/middlewares/database'
import { Mongoose } from 'mongoose'
import BuyerModel from 'server/models/buyer.model'
import { doesPasswordMatch } from 'server/utils/password'

const handler = nc()
  .use(middleware)
  .post(
    async (
      req: NextApiRequest & { db: Mongoose }, // db is coming from the middleware
      res: NextApiResponse
    ) => {
      try {
        const { email, password } = req.body

        console.log({ email, password })

        const buyerExists = await BuyerModel.findOne({
          email,
        })

        if (!buyerExists)
          return res.status(StatusCodes.CONFLICT).json({
            message: 'Username or password incorrect',
          })

        if (!doesPasswordMatch(password, buyerExists.password))
          return res.status(StatusCodes.CONFLICT).json({
            message: 'Username or password incorrect',
          })

        res.status(StatusCodes.CREATED).json({
          message: 'Logged in successfully',
        })
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Cannot login at the moment',
        })
      }
    }
  )

export default handler
