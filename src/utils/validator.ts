import Joi from 'joi'

export class ValidateLogin {
  constructor(email: string, password: string) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    })
    return schema.validate({ email, password })
  }
}

export class ValidateRegister {
  constructor(email: string, password: string) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    })
    return schema.validate({ email, password })
  }
}
