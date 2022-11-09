import React, { CSSProperties, ReactElement, useContext, useState } from 'react'
import Modal from 'components/Modal'
import Card from 'components/Card'
import Textarea from 'components/Textarea'
import Button from 'components/Button'
import CardStatus from 'domains/board/components/CardStatus'
import { Card as CardType } from 'domains/board/models/Card'
import ConfirmationModal from 'components/ConfirmationModal'
import { ConfirmationModalProps } from 'components/ConfirmationModal/ConfirmationModal'
import { editCard, deleteCard } from 'infra'
import BoardContext from 'domains/board/contexts/BoardContext'
import LoadingContext from 'contexts/LoadingContext'
import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import styles from './EditCardModal.module.scss'
import CriticityLevelSelect from '../CriticityLevelSelect'

const confirmationModalProps: ConfirmationModalProps = {
    title: 'Delete Card',
    description: 'Do you really want to delete this record?',
    continueButtonText: 'Continue',
    closeButtonText: 'Close',
    onContinue: () => {},
    onClose: () => {},
}

type EditCardModalProps = {
    card: CardType
    style?: CSSProperties
    onSave: () => void
    onClose: () => void
    onDelete: () => void
    columnId: string
}

function EditCardModal({
    card,
    style,
    onSave,
    onDelete,
    onClose,
    columnId,
}: EditCardModalProps): ReactElement {
    const [updatedCard, setUpdatedCard] = useState({ ...card })
    const [isShowingConfirmationModal, setIsShowingConfirmationModal] = useState(false)
    const { refreshBoard } = useContext(BoardContext)
    const { showLoading, closeLoading } = useContext(LoadingContext)

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdatedCard((prev) => ({ ...prev, description: event.target.value }))
    }

    const handleCriticityChange = (status?: CriticityLevel) => {
        setUpdatedCard((prev) => ({
            ...prev,
            status,
        }))
    }

    const saveCard = () => {
        showLoading()

        editCard(card.id, updatedCard, columnId).then(() => {
            closeLoading()
            refreshBoard()
            onSave()
        })
    }

    const handleDeleteCard = () => {
        showLoading()

        deleteCard(card.id, columnId).then(() => {
            setIsShowingConfirmationModal(false)
            closeLoading()
            refreshBoard()
            onDelete()
        })
    }

    return (
        <>
            <Modal onClose={onClose} className={styles.modal} style={style}>
                <div className={styles.cardWrapper}>
                    <Card className={styles.card}>
                        <CardStatus status={card.status} />
                        <Textarea
                            fullWidth
                            placeholder="Enter a description for this card…"
                            value={updatedCard.description}
                            onChange={handleTextareaChange}
                        />
                    </Card>
                    <div className={styles.actionButtons}>
                        <Button
                            type="button"
                            color="success"
                            variant="contained"
                            size="small"
                            onClick={saveCard}
                        >
                            Save
                        </Button>
                        <Button
                            type="button"
                            color="error"
                            variant="contained"
                            size="small"
                            onClick={() => setIsShowingConfirmationModal(true)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <CriticityLevelSelect
                    className={styles.criticity}
                    status={updatedCard.status}
                    handleChange={handleCriticityChange}
                />
            </Modal>
            {isShowingConfirmationModal ? (
                <ConfirmationModal
                    {...confirmationModalProps}
                    onClose={() => setIsShowingConfirmationModal(false)}
                    onContinue={handleDeleteCard}
                />
            ) : null}
        </>
    )
}

EditCardModal.defaultProps = {
    style: undefined,
}

export default EditCardModal
export type { EditCardModalProps }
