import Button from 'components/Button'
import LoadingContext from 'contexts/LoadingContext'
import { forgotPassword } from 'infra'
import React, { ReactElement, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './ForgotPassword.module.scss'

export default function ForgotPassword(): ReactElement {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const { showLoading, closeLoading } = useContext(LoadingContext)

    const history = useHistory()

    const onEmailSent = () => {
        closeLoading()
        history.push(`/verify-code?email=${email}`)
    }

    const onError = () => {
        setError('Could not send the email. Please try again.')
        closeLoading()
    }

    const handleForgotPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email) {
            setError('Please enter your email')
            return
        }

        showLoading()

        forgotPassword(email).then(onEmailSent).catch(onError)
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    return (
        <form onSubmit={handleForgotPassword} className={styles.container}>
            <div className={styles.credentials}>
                <div className={styles.title}>Forgot password</div>

                <div className={styles.subTitle}>
                    Enter your email for the verification proccess. We will send a 4 digits code to
                    your email.
                </div>

                <input
                    className={`${styles.emailInput} ${error ? styles.error : ''}`}
                    placeholder="Email address"
                    onChange={onChangeEmail}
                />

                <div className={styles.errorText}>{error}</div>

                <Button type="submit" variant="contained" className={styles.continueButton}>
                    Continue
                </Button>
            </div>
        </form>
    )
}
