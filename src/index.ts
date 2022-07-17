import 'dotenv/config'
import express from 'express'
import DataSource from './lib/DataSource'
import baseRouter from './routes/baseApi'

const main = async () => {
  const app = express()

  await DataSource.connect()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/api', baseRouter)

  const PORT = process.env.PORT || 3080

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`)
  })
}

main().catch((error) => {
  console.log('Server starting error:', error)
})
