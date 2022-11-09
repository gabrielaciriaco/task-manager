import Card from 'components/Card'
import { Card as CardType } from 'domains/board/models/Card'
import React, { CSSProperties, ReactElement, useState } from 'react'
import CardStatus from 'domains/board/components/CardStatus'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import { PenIcon } from 'components/Icons'
import styles from './BoardCard.module.scss'
import EditCardModal from '../EditCardModal'

type BoardCardProps = {
    card: CardType
    className?: string
    index: number
    columnId: string
}

function BoardCard({ card, className, index, columnId }: BoardCardProps): ReactElement {
    const [isShowingModal, setIsShowingModal] = useState(false)
    const [modalStyle, setModalStyle] = useState<CSSProperties | undefined>(undefined)
    const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null)

    const setRef = (dragProvided: DraggableProvided, ref: HTMLDivElement | null): void => {
        dragProvided.innerRef(ref)
        setCardRef(ref)
    }

    const onEdit = (): void => {
        if (cardRef) {
            setModalStyle({
                top: cardRef.getBoundingClientRect().top,
                left: cardRef.getBoundingClientRect().left,
                width: cardRef.clientWidth * 1.4,
                height: cardRef.clientHeight * 1.3,
            })
            setIsShowingModal(true)
        }
    }

    const closeModal = () => {
        setModalStyle({})
        setIsShowingModal(false)
    }

    return (
        <>
            <Draggable draggableId={`${card.id}`} index={index}>
                {(dragProvided: DraggableProvided) => (
                    <Card
                        data-testid="board-card"
                        className={`${styles.card} ${className}`}
                        ref={(ref) => setRef(dragProvided, ref)}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                    >
                        <button
                            className={`${styles.hoveredElement} ${styles.editButton}`}
                            type="button"
                            title="Edit Card"
                            aria-label="Edit Card"
                            onClick={onEdit}
                        >
                            <span className={styles.hideInformation}>Edit Card</span>
                            <PenIcon
                                className={styles.editIcon}
                                fontSize="small"
                                aria-hidden="true"
                            />
                        </button>
                        <CardStatus status={card.status} />
                        <span className={styles.description}>{card.description}</span>
                    </Card>
                )}
            </Draggable>
            {isShowingModal && modalStyle ? (
                <EditCardModal
                    card={card}
                    style={modalStyle}
                    onSave={closeModal}
                    onDelete={closeModal}
                    onClose={closeModal}
                    columnId={columnId}
                />
            ) : null}
        </>
    )
}

BoardCard.defaultProps = {
    className: '',
}

export default BoardCard
export type { BoardCardProps }
