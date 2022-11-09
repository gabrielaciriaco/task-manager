/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useContext, useRef, useState } from 'react'
import { Column } from 'domains/board/models/Column'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import ConfirmationModal from 'components/ConfirmationModal'
import Input from 'components/Input'
import { ConfirmationModalProps } from 'components/ConfirmationModal/ConfirmationModal'
import { createCard, deleteColumn, editColumn } from 'infra'
import BoardContext from 'domains/board/contexts/BoardContext'
import LoadingContext from 'contexts/LoadingContext'
import { TrashIcon } from 'components/Icons'
import Card from 'components/Card'
import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import styles from './BoardColumn.module.scss'
import BoardColumnFooter from './BoardColumnFooter'
import CardOrganizer from './CardOrganizer'
import CriticityLevelSelect from '../CriticityLevelSelect'

const confirmationModalProps: ConfirmationModalProps = {
    title: 'Delete Column',
    description: 'Do you really want to delete this record?',
    continueButtonText: 'Continue',
    closeButtonText: 'Close',
    onContinue: () => {},
    onClose: () => {},
}

type NewCard = {
    description: string
    status?: CriticityLevel
}

const defaultNewCard: NewCard = {
    description: '',
    status: undefined,
}

type BoardColumnProps = {
    column: Column
    index: number
}

function BoardColumn({ column, index }: BoardColumnProps): ReactElement {
    const { refreshBoard } = useContext(BoardContext)
    const { showLoading, closeLoading } = useContext(LoadingContext)

    const [isCreatingCard, setIsCreatingCard] = useState(false)
    const [newCard, setNewCard] = useState<NewCard>(defaultNewCard)

    const [isEditingColumn, setIsEditingColumn] = useState(false)
    const [columnTitle, setColumnTitle] = useState(column.title)

    const [isShowingConfirmationModal, setIsShowingConfirmationModal] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleColumnTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(event.target.value)
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewCard((prev) => ({ ...prev, description: event.target.value }))
    }

    const handleCriticityChange = (status?: CriticityLevel) => {
        setNewCard((prev) => ({ ...prev, status }))
    }

    const handleDeleteColumn = (): void => {
        showLoading()
        deleteColumn(column.id).then(() => {
            setIsShowingConfirmationModal(false)
            closeLoading()
            refreshBoard()
        })
    }

    const saveNewCard = (): void => {
        showLoading()
        const newCardBody = { status: newCard.status, description: newCard.description }
        createCard(newCardBody, column.id).then(() => {
            setNewCard(defaultNewCard)
            setIsCreatingCard(false)
            closeLoading()
            refreshBoard()
        })
    }

    const onUpdate = () => {
        setIsEditingColumn(true)

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 50)
    }

    const updateColumn = (): void => {
        if (column.title !== columnTitle) {
            showLoading()

            editColumn(column.id, { title: columnTitle }).then(() => {
                setIsEditingColumn(false)
                refreshBoard()
                closeLoading()
            })
        } else {
            setIsEditingColumn(false)
        }
    }

    const cancelForm = () => {
        setNewCard(defaultNewCard)
        setIsCreatingCard(false)
    }

    return (
        <>
            <Draggable draggableId={column.id} index={index}>
                {(provided: DraggableProvided) => (
                    <div
                        ref={provided.innerRef}
                        className={styles.column}
                        {...provided.draggableProps}
                    >
                        <Card className={styles.header} {...provided.dragHandleProps}>
                            {isEditingColumn ? (
                                <Input
                                    autoFocus
                                    fullWidth
                                    disableUnderline={false}
                                    value={columnTitle}
                                    onChange={handleColumnTitleChange}
                                    onBlur={updateColumn}
                                    ref={inputRef}
                                />
                            ) : (
                                <h2 onClick={onUpdate} className={styles.title}>
                                    {column.title}
                                </h2>
                            )}
                            <button
                                className={styles.deleteButton}
                                type="button"
                                title="Delete Column"
                                aria-label="Delete Column"
                                onClick={() => setIsShowingConfirmationModal(true)}
                            >
                                <span className={styles.hideInformation}>Delete Column</span>
                                <TrashIcon aria-hidden="true" />
                            </button>
                        </Card>
                        <CardOrganizer
                            column={column}
                            isCreatingCard={isCreatingCard}
                            newCardDescription={newCard.description}
                            onDescriptionChange={handleDescriptionChange}
                        />
                        {isCreatingCard && (
                            <CriticityLevelSelect
                                className={styles.criticity}
                                status={newCard.status}
                                handleChange={handleCriticityChange}
                            />
                        )}
                        <BoardColumnFooter
                            isCreatingCard={isCreatingCard}
                            addCard={() => setIsCreatingCard(true)}
                            saveNewCard={saveNewCard}
                            cancelForm={cancelForm}
                        />
                    </div>
                )}
            </Draggable>
            {isShowingConfirmationModal ? (
                <ConfirmationModal
                    {...confirmationModalProps}
                    onClose={() => setIsShowingConfirmationModal(false)}
                    onContinue={handleDeleteColumn}
                />
            ) : null}
        </>
    )
}

export default BoardColumn
export type { BoardColumnProps }
