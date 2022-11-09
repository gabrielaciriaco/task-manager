import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import React, { ReactElement } from 'react'
import styles from './CardStatus.module.scss'

type StatusDetails = {
    description?: string
    className: string
}

type CardStatusProps = {
    status?: CriticityLevel
}

function CardStatus({ status }: CardStatusProps): ReactElement {
    function getStatusDetails(cardStatus?: CriticityLevel): StatusDetails {
        switch (cardStatus) {
            case CriticityLevel.LOW:
                return {
                    description: 'Low Criticity',
                    className: styles.lowCriticity,
                }
            case CriticityLevel.MEDIUM:
                return {
                    description: 'Medium Criticity',
                    className: styles.mediumCriticity,
                }
            case CriticityLevel.HIGH:
                return {
                    description: 'High Criticity',
                    className: styles.highCriticity,
                }
            default:
                return {
                    className: styles.noneStatus,
                }
        }
    }

    const statusDetails = getStatusDetails(status)

    return (
        <span
            className={`${styles.status} ${statusDetails.className}`}
            title={statusDetails.description}
        >
            <span>{statusDetails.description}</span>
        </span>
    )
}

CardStatus.defaultProps = {
    status: '',
}

export default CardStatus
export type { CardStatusProps }
