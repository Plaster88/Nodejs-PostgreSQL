import { User } from '../interfaces'
import UserModel from '../models'
import { Model } from 'sequelize'

export default class UserService {

  public getAllUsers (): Promise<Model<User>[]> {
    return UserModel.findAll({ where: { isDeleted: false } })
  }

  public getUserById (id: string): Promise<Model<User>> {
    return UserModel.findOne({ where: { id: id, isDeleted: false } })
  }

  public updateUserById (id: string, user: User): Promise<[number, Model<User>[]]> {
    return UserModel.update(user, { where: { id: id, isDeleted: false } })
  }

  public createUser (user: User): Promise<Model<User>> {
    return UserModel.create({ ...user })
  }

  public async deleteUserById (id: string): Promise<[number, Model<User>[]]> {
    const user = await this.getUserById(id)
    return UserModel.update({
      ...user,
      isDeleted: true
    }, { where: { id: id, isDeleted: false } })
  }
}
