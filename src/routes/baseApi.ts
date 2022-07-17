import express from 'express'
import userRouter from './userRouter'
import authRouter from './authRouter'

const Router = express.Router()

Router.use('/auth', authRouter)
Router.use('/users', userRouter)

export default Router
