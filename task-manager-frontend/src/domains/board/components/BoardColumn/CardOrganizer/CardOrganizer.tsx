import React, { ReactElement, ReactNode } from 'react'
import { Column } from 'domains/board/models/Column'
import BoardCard from 'domains/board/components/BoardCard'
import Textarea from 'components/Textarea'
import Card from 'components/Card'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import styles from './CardOrganizer.module.scss'

type CardOrganizerProps = {
    column: Column
    isCreatingCard: boolean
    newCardDescription: string
    onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function CardOrganizer({
    column,
    isCreatingCard,
    newCardDescription,
    onDescriptionChange,
}: CardOrganizerProps): ReactElement {
    function renderCards(): ReactNode {
        return column.cards.map((card, index) => (
            <BoardCard
                key={card.id}
                index={index}
                card={card}
                className={styles.card}
                columnId={column.id}
            />
        ))
    }

    return (
        <Droppable droppableId={column.id} type="QUOTE" ignoreContainerClipping={false}>
            {(dropProvided: DroppableProvided) => (
                <div
                    {...dropProvided.droppableProps}
                    ref={dropProvided.innerRef}
                    className={styles.cardColumnWrapper}
                >
                    {renderCards()}
                    {dropProvided.placeholder}
                    {isCreatingCard ? (
                        <Card className={styles.formCard}>
                            <Textarea
                                fullWidth
                                placeholder="Enter a description for this card…"
                                value={newCardDescription}
                                onChange={onDescriptionChange}
                            />
                        </Card>
                    ) : null}
                </div>
            )}
        </Droppable>
    )
}

export default CardOrganizer
export type { CardOrganizerProps }
