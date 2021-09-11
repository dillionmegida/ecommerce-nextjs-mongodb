import mongoose from 'mongoose'
import nextConnect from 'next-connect'

const uri = process.env.MONGODB_URI

async function database(req, res, next) {
  await mongoose.connect(uri)
  return next()
}

const databaseMiddleware = nextConnect()

databaseMiddleware.use(database)

export default databaseMiddleware
