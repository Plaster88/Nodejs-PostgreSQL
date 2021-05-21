import {
  ContainerTypes,
  ValidatedRequestSchema
} from 'express-joi-validation'

import { Model } from 'sequelize'

export interface User extends Model {
  id: string
  login: string
  password: string
  age: number
  isDeleted: boolean
}

export interface ValidationSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    login: string
    password: string
    age: number
    isDeleted: boolean
  }
}
