import { User } from 'domains/user/models/User'
import { get } from './apiService'

const getCurrentUser = (): Promise<User> => get('user')

export { getCurrentUser }
