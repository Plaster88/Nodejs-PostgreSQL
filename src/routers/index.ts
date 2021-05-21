import * as express from 'express'
import userValidation from '../validations'
import { User, ValidationSchema } from '../interfaces'
import { ValidatedRequest } from 'express-joi-validation'
import UserService from '../services'
import { Model } from 'sequelize'

const router = express.Router()
const userService = new UserService()

router.get('/', async (req, res) => {
  const users = await userService.getAllUsers()
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const id: string = req.params.id
  const user: Model<User> = await userService.getUserById(id)
  if (user === null) {
    res.status(404).json({ message: `User with id ${id} is not found.` })
  } else {
    res.json(user)
  }
})

router.post('/', userValidation, async (req: ValidatedRequest<ValidationSchema>, res) => {
  const user: User = req.body
  await userService.createUser(user)
  res.send(`New user ${user.login} was created!`)
})

router.put('/:id', userValidation, async (req: ValidatedRequest<ValidationSchema>, res) => {
  const id: string = req.params.id
  const userModel: Model<User> = await userService.getUserById(id)
  const user: User = userModel.get({ plain: true })
  if (user === null) {
    res.status(404).json({ message: `User with id ${id} is not found.` })
  } else {
    userService.updateUserById(id, req.body)
    res.send(`User ${user.login} was updated!`)
  }
})

router.delete('/:id', async (req, res) => {
  const id: string = req.params.id
  const userModel: Model<User> = await userService.getUserById(id)
  const user: User = userModel.get({ plain: true })
  if (user === null) {
    res.status(404).json({ message: `User with id ${id} is not found.` })
  } else {
    userService.deleteUserById(id)
    res.send(`User ${user.login} was deleted!`)
  }
})

export default router
