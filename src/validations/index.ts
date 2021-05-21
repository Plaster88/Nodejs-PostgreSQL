import * as Joi from 'joi'
import { createValidator } from 'express-joi-validation'

const validator = createValidator()

const bodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().required()
})

const userValidation = validator.body(bodySchema)

export default userValidation
