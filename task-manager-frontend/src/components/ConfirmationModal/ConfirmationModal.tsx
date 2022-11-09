import React, { ReactElement } from 'react'
import Modal from 'components/Modal'
import Button from 'components/Button'
import styles from './ConfirmationModal.module.scss'

type ConfirmationModalProps = {
    title: string
    description: string
    continueButtonText: string
    closeButtonText: string
    onContinue: () => void
    onClose: () => void
}

function ConfirmationModal({
    title,
    description,
    continueButtonText,
    closeButtonText,
    onContinue,
    onClose,
}: ConfirmationModalProps): ReactElement {
    return (
        <Modal
            onClose={onClose}
            className={styles.modal}
            backgroundClassName={styles.modalBackground}
        >
            <h2>{title}</h2>
            <p>{description}</p>
            <div className={styles.actionButtons}>
                <Button
                    type="button"
                    color="primary"
                    variant="outlined"
                    size="small"
                    onClick={onClose}
                >
                    {closeButtonText}
                </Button>
                <Button
                    type="button"
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={onContinue}
                >
                    {continueButtonText}
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmationModal
export type { ConfirmationModalProps }
