import { StatusCodes } from '@enums/StatusCodes'
import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { getTokenFromCookie, isTokenValid } from 'server/utils/token'

async function isAuthenticated(
  req: NextApiRequest & { user: any },
  res: NextApiResponse,
  next: any
) {
  const token = getTokenFromCookie(req)

  const isValid = isTokenValid(token)

  if (!isValid)
    return res
      .status(StatusCodes.UNATHORIZED)
      .json({ message: 'User is not authenticated' })

  req.user = isValid

  next()
}

const isAuthenticatedMiddleware = nextConnect()

isAuthenticatedMiddleware.use(isAuthenticated)

export default isAuthenticatedMiddleware
