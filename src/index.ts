import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import AppDataRource from './lib/DataSource'
import baseRouter from './routes/baseApi'
import * as redis from 'redis'
import connectRedis from 'connect-redis'

const main = async () => {
  const app = express()

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient({ legacyMode: true })

  await AppDataRource.connect()
  await redisClient.connect()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      },
      store: new RedisStore({ client: redisClient }),
      secret: String(process.env.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use('/api', baseRouter)

  app.use('/', (_req, res) => {
    res.send('Hello World!')
  })

  const PORT = process.env.PORT || 3080

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`)
  })
}

main().catch((error) => {
  console.log('Server starting error:', error)
})
