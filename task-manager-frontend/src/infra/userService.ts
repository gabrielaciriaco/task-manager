import { User } from 'domains/user/models/User'
import { get, put } from './apiService'

const getCurrentUser = (): Promise<User> => get('user')

const changePassword = (email: string, { password }: { password: string }): Promise<void> =>
    put('user', email, { password })

export { getCurrentUser, changePassword }
