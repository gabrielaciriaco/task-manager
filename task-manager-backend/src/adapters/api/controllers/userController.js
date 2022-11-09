const userController = (userService) => {
  const create = async (req, res) => {
    const { email, password } = req.body
    const user = await userService.create(email, password)
    res.status(201).json(user)
  }

  const login = async (req, res) => {
    const { email, password } = req.body
    const token = await userService.login(email, password)
    res.status(200).json(token)
  }

  const updateUser = async (req, res) => {
    const { email } = req.params
    const { password } = req.body
    const user = await userService.update(email, password)
    res.status(200).json(user)
  }

  return {
    create,
    login,
    updateUser
  }
}

export default userController
