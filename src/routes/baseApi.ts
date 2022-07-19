import express from 'express'
import userRouter from './userRouter'
import authRouter from './authRouter'

const Router = express.Router()

Router.use('/auth', authRouter)
Router.use('/', userRouter)

export default Router

// export const Routes = [
//   {
//     method: 'get',
//     route: '/users',
//     controller: UserController,
//     action: 'all',
//   },
//   {
//     method: 'get',
//     route: '/users/:id',
//     controller: UserController,
//     action: 'one',
//   },
//   {
//     method: 'post',
//     route: '/users',
//     controller: UserController,
//     action: 'save',
//   },
//   {
//     method: 'delete',
//     route: '/users/:id',
//     controller: UserController,
//     action: 'remove',
//   },
// ]
