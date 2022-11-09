import jwt from 'jsonwebtoken'

import User from '../entities/user.js'
import userRepository from '../../adapters/repository/userRepository.js'
import * as emailClient from '../../adapters/email/emailClient.js'
import config from '../../adapters/config/config.js'

const create = (email, password, photo) => {
  const hashedPassword = Buffer.from(password).toString('base64')
  const user = new User(email, hashedPassword, photo)
  return userRepository.createOneAsync(user)
}

const login = async (email, password) => {
  const hashedPassword = Buffer.from(password).toString('base64')
  const user = await userRepository.getOneByEmailAsync(email)

  if (user?.password === hashedPassword) {
    const token = jwt.sign({ email }, config.tokenSecret, {
      expiresIn: '1h'
    })
    return token
  }
  return null
}

const update = (email, password, photo) => {
  const hashedPassword = Buffer.from(password).toString('base64')
  const user = new User(email, hashedPassword, photo)
  return userRepository.updateOneAsync(email, user)
}

const get = (email) => {
  return userRepository.getOneByEmailAsync(email)
}

const forgotPassword = async (email) => {
  const token = Math.floor(10000 + Math.random() * 90000).toString()
  await userRepository.setToRestorePassword(email, token)
  await emailClient.sendEmail(
    email,
    'Restore password',
    `Your token is ${token}`
  )
}

const resetPassword = async (token, email) => {
  const user = await userRepository.getOneByEmailAsync(email)
  if (user?.changePasswordToken === token) {
    const token = jwt.sign({ email }, config.changePasswordSecret, {
      expiresIn: '1h'
    })
    return token
  }
}

export { create, login, update, get, forgotPassword, resetPassword }
