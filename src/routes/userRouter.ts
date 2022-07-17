import express from 'express'

const Router = express.Router()

Router.get('/', (_req, res) => {
  res.send('Hello World!')
})

export default Router
