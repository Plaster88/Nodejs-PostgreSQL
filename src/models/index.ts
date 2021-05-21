import { Sequelize, DataTypes } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_CONNECTION)

sequelize.authenticate()

const UserModel = sequelize.define('users', {
  id: {
    allowNull: false,
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  login: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  isDeleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: false
})

export default UserModel
