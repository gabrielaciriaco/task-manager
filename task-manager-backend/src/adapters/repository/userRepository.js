import { User } from '../schemas/schemas.js'

const userRepository = {
  async createOneAsync(user) {
    const newUser = new User({
      email: user.email,
      password: user.password,
      photo: user.photo
    })
    return User.create(newUser)
  },

  async updateOneAsync(email, user) {
    return User.findOneAndUpdate({ email: email }, user)
  },

  async getOneByEmailAsync(email) {
    return User.findOne({ email: email })
  },

  async setToRestorePassword(email, token) {
    return User.findOneAndUpdate(
      { email: email },
      { changePasswordToken: token }
    )
  },

  async deleteOneAsync(email) {
    return User.findOneAndDelete({ email: email })
  }
}

export default userRepository
