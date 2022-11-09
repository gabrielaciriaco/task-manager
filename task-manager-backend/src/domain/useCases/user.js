import jwt from 'jsonwebtoken'

import User from '../entities/user.js'
import userRepository from '../../adapters/repository/userRepository.js'
import config from '../../adapters/config/config.js'

const create = (email, password) => {
  const hashedPassword = Buffer.from(password).toString('base64')
  const user = new User(email, hashedPassword)
  return userRepository.createOneAsync(user)
}

const login = async (email, password) => {
  const hashedPassword = Buffer.from(password).toString('base64')
  const user = await userRepository.getOneByEmailAsync(email)
  if (user.password === hashedPassword) {
    const token = jwt.sign({ email }, config.tokenSecret, { expiresIn: '1h' })
    return token
  }
  return null
}

const update = (email, password) => {
  const hashedPassword = Buffer.from(password).toString('base64')
  const user = new User(email, hashedPassword)
  return userRepository.updateOneAsync(email, user)
}

export { create, login, update }
