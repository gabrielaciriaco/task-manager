import Button from 'components/Button'
import LoadingContext from 'contexts/LoadingContext'
import { changePassword, getCurrentUser } from 'infra'
import React, { ReactElement, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './ChangePassword.module.scss'

export default function ChangePassword(): ReactElement {
    const [newPassword, setNewPassword] = useState('')
    const [confirmationPassword, setPassword] = useState('')
    const [error, setError] = useState('')

    const { showLoading, closeLoading } = useContext(LoadingContext)

    const history = useHistory()

    const onConfirmationPasswordSuccess = () => {
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

        const user = await getCurrentUser()

        changePassword(user.email, { password: newPassword, photo: user.photo })
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
