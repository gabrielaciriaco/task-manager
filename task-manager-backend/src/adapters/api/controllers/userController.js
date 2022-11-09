const userController = (userService) => {
  const create = async (req, res) => {
    const { email, password, photo } = req.body
    const user = await userService.create(email, password, photo)
    res.status(201).json(user)
  }

  const login = async (req, res) => {
    const { email, password } = req.body
    const token = await userService.login(email, password)
    if (token) {
      return res.status(200).json({ token })
    }
    res.status(401).json(token)
  }

  const updateUser = async (req, res) => {
    const { email } = req.params
    const { password, photo } = req.body
    const user = await userService.update(email, password, photo)
    res.status(200).json(user)
  }

  const getUser = async (req, res) => {
    const email = req.user.email
    const user = await userService.get(email)
    res.status(200).json(user)
  }

  return {
    create,
    login,
    updateUser,
    getUser
  }
}

export default userController
