import express from 'express'
import { StatusCodes } from 'http-status-codes'
import userInfoService from '../service/userInfoService'
import userService from '../service/userService'

const Router = express.Router()

Router.post('/user', async (req, res) => {
  try {
    const body = req.body

    const userId = req.session.userId as string

    const newUserInfo = await userInfoService.createUser(body)
    await userService.update(userId, { userInfo: newUserInfo })

    return res.status(StatusCodes.CREATED).json({
      code: StatusCodes.CREATED,
      message: 'User created',
      user: newUserInfo,
    })
  } catch (error) {
    const code = error.code || 500
    return res.status(code).json({
      code: code,
      message: error.message,
    })
  }
})

Router.get('/user', async (req, res) => {
  try {
    const userId = req.session.userId as string
    const user = await userService.findOne('id', userId)
    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'User found',
      user,
    })
  } catch (error) {
    const code = error.code || 500
    return res.status(code).json({
      code: code,
      message: error.message,
    })
  }
})

export default Router
