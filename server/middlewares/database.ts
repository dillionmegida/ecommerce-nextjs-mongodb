import mongoose from 'mongoose'
import nextConnect from 'next-connect'

const uri = process.env.MONGODB_URI

async function database(req, res, next) {
  await mongoose.connect(uri)
  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware
