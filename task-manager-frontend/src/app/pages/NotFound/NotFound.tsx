import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { NotFoundIcon } from 'components/Icons'
import styles from './styles.module.scss'

function NotFound(): ReactElement {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Oops!</div>

            <div className={styles.subTitle}>You are lost</div>

            <NotFoundIcon />

            <Link to="/" className={styles.homeLink}>
                Go Home
            </Link>
        </div>
    )
}

export default NotFound
