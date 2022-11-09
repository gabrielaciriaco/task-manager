import Button from 'components/Button'
import LoadingContext from 'contexts/LoadingContext'
import { changePassword, getCurrentUser, login, storeAuthToken } from 'infra'
import React, { ReactElement, useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './ChangePassword.module.scss'

export default function ChangePassword(): ReactElement {
    const [newPassword, setNewPassword] = useState('')
    const [confirmationPassword, setPassword] = useState('')
    const [error, setError] = useState('')
    const location = useLocation()

    const email = new URLSearchParams(location.search).get('email') || ''

    const { showLoading, closeLoading } = useContext(LoadingContext)

    const history = useHistory()

    const onConfirmationPasswordSuccess = async () => {
        const { token } = await login(email, newPassword)
        storeAuthToken(token)

        closeLoading()
        history.push('/board')
    }

    const onError = () => {
        setError('The password and confirmation password should be the same!')
        closeLoading()
    }

    const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (newPassword && confirmationPassword && newPassword !== confirmationPassword) {
            setError('The password and confirmation password should be the same!')
            return
        }

        showLoading()

        changePassword(email, { password: newPassword })
            .then(onConfirmationPasswordSuccess)
            .catch(onError)
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value)
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <form onSubmit={handleChangePassword} className={styles.container}>
            <div className={styles.credentials}>
                <div className={styles.title}>Change Password</div>

                <input
                    name="newPassword"
                    className={`${styles.emailInput} ${error ? styles.error : ''}`}
                    placeholder="New Password"
                    onChange={onChangeEmail}
                />

                <input
                    className={`${styles.passwordInput} ${error ? styles.error : ''}`}
                    placeholder="Confirmation Password"
                    onChange={onChangePassword}
                    type="confirmationPassword"
                />

                <div className={styles.smallText}>
                    <div className={styles.errorText}>{error}</div>
                </div>

                <Button type="submit" variant="contained" className={styles.loginButton}>
                    Change Password
                </Button>
            </div>
        </form>
    )
}
