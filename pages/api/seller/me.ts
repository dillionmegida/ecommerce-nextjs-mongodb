import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import databaseMiddleware from 'server/middlewares/database'
import { Mongoose } from 'mongoose'
import isAuthenticatedMiddleware from '@middlewares/isAuthenticated'

const handler = nc()
  .use(databaseMiddleware, isAuthenticatedMiddleware)
  .get(
    async (
      req: NextApiRequest & {
        db: Mongoose // coming from the databaseMiddleware
        user: { _id: any; email: string }
      },
      res: NextApiResponse
    ) => {
      // req.user is coming from the isAuthenticatedMiddleware
      return res.json(req.user)
    }
  )

export default handler
