class User {
  constructor(email, password, photo) {
    this.email = email
    this.password = password
    this.photo = photo
    this.changePasswordToken = null
  }
}

export default User
