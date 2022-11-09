import { post } from './apiService'

const storeAuthToken = (token: string): void => {
    localStorage.setItem('auth_token', token)
}

const getAuthToken = (): string | null => localStorage.getItem('auth_token')

const login = (email: string, password: string): Promise<{ token: string }> =>
    post('login', { email, password })

const logout = (): void => {
    localStorage.removeItem('auth_token')
}

const forgotPassword = (email: string): Promise<void> => {
    return post('forgot-password', { email })
}

const verifyResetPasswordCode = ({
    code,
    email,
}: {
    code: string
    email: string
}): Promise<string> => {
    return post('resetPassword', { token: code, email })
}

export { storeAuthToken, getAuthToken, login, logout, forgotPassword, verifyResetPasswordCode }
