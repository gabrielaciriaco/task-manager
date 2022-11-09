import React, { forwardRef } from 'react'
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card'
import styles from './Card.module.scss'

type CardProps = MuiCardProps

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, ...props }: CardProps, ref) => {
        return (
            <MuiCard
                data-testid="card"
                ref={ref}
                {...props}
                className={`${className} ${styles.card}`}
            >
                {children}
            </MuiCard>
        )
    }
)

export default Card
export type { CardProps }
