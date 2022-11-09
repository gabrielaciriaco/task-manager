import Button from 'components/Button'
import LoadingContext from 'contexts/LoadingContext'
import { login, storeAuthToken } from 'infra'
import React, { ReactElement, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './Login.module.scss'

export default function Login(): ReactElement {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { showLoading, closeLoading } = useContext(LoadingContext)

    const history = useHistory()

    const onLoginSuccess = ({ token }: { token: string }) => {
        storeAuthToken(token)
        closeLoading()
        history.push('/board')
    }

    const onError = () => {
        setError('Wrong email or password. Please try again.')
        closeLoading()
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email || !password) {
            setError('Please enter your email and password')
            return
        }

        showLoading()

        login(email, password).then(onLoginSuccess).catch(onError)
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <form onSubmit={handleLogin} className={styles.container}>
            <div className={styles.credentials}>
                <div className={styles.title}>Log in to Task Manager</div>

                <input
                    name="email"
                    className={`${styles.emailInput} ${error ? styles.error : ''}`}
                    placeholder="Email address"
                    onChange={onChangeEmail}
                />

                <input
                    className={`${styles.passwordInput} ${error ? styles.error : ''}`}
                    placeholder="Password"
                    onChange={onChangePassword}
                    type="password"
                />

                <div className={styles.smallText}>
                    <div className={styles.errorText}>{error}</div>

                    <Link className={styles.forgotPassword} to="/forgot-password">
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" variant="contained" className={styles.loginButton}>
                    Log In
                </Button>
            </div>
        </form>
    )
}
