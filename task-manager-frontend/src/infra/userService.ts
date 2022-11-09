import { User } from 'domains/user/models/User'
import { get, put } from './apiService'

const getCurrentUser = (): Promise<User> => get('user')

const changePassword = (
    email: string,
    { password, photo }: { password: string; photo: string }
): Promise<void> => put('user', email, { password, photo })

export { getCurrentUser, changePassword }
