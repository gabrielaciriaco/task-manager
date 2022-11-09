import React, { ReactElement, useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from 'components/Button'
import LoadingContext from 'contexts/LoadingContext'
import { storeAuthToken, verifyResetPasswordCode } from 'infra'
import styles from './VerifyCode.module.scss'

export default function VerifyCode(): ReactElement {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')

    const location = useLocation()

    const email = new URLSearchParams(location.search).get('email') || ''

    const { showLoading, closeLoading } = useContext(LoadingContext)

    const history = useHistory()

    const onCodeVerify = (newToken: string) => {
        closeLoading()
        storeAuthToken(newToken)
        history.push(`/change-password`)
    }

    const onError = () => {
        setError('Could not verify the code')
        closeLoading()
    }

    const handleVerifyCode = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (code.length !== 4) {
            setError('The token must have 4 digits')
            return
        }

        showLoading()

        verifyResetPasswordCode({ code, email }).then(onCodeVerify).catch(onError)
    }

    const onChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value)
    }

    return (
        <form onSubmit={handleVerifyCode} className={styles.container}>
            <div className={styles.credentials}>
                <div className={styles.title}>Verification</div>

                <div className={styles.subTitle}>
                    Enter your 4 digits code that you received on your email.
                </div>

                <input
                    className={`${styles.codeInput} ${error && styles.error}`}
                    placeholder="Code"
                    onChange={onChangeCode}
                />
                <div className={styles.errorText}>{error}</div>

                <Button type="submit" variant="contained" className={styles.continueButton}>
                    Continue
                </Button>
            </div>
        </form>
    )
}
