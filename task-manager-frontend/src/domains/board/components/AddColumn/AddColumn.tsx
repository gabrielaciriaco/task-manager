import React, { ReactElement, useContext, useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import { createColumn } from 'infra'
import BoardContext from 'domains/board/contexts/BoardContext'
import LoadingContext from 'contexts/LoadingContext'
import { CloseIcon } from 'components/Icons'
import styles from './AddColumn.module.scss'

type AddColumnProps = {
    columnIndex: number
}

function AddColumn({ columnIndex }: AddColumnProps): ReactElement {
    const { refreshBoard } = useContext(BoardContext)
    const { showLoading, closeLoading } = useContext(LoadingContext)

    const [isCreatingColumn, setIsCreatingColumn] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')

    const handleColumnTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(event.target.value)
    }

    const saveNewColumn = (): void => {
        showLoading()
        createColumn({
            title: columnTitle,
            index: columnIndex,
        }).then(() => {
            setColumnTitle('')
            setIsCreatingColumn(false)
            closeLoading()
            refreshBoard()
        })
    }

    const cancelForm = () => {
        setColumnTitle('')
        setIsCreatingColumn(false)
    }

    return (
        <div className={styles.wrapper}>
            {isCreatingColumn ? (
                <>
                    <Input
                        value={columnTitle}
                        onChange={handleColumnTitleChange}
                        placeholder="Enter column title..."
                    />
                    <div className={styles.actionButtons}>
                        <Button
                            type="button"
                            color="success"
                            variant="contained"
                            size="small"
                            onClick={saveNewColumn}
                            className={styles.saveButton}
                        >
                            Save column
                        </Button>
                        <button
                            className={styles.closeButton}
                            type="button"
                            title="Cancel Form"
                            aria-label="Cancel Form"
                            onClick={cancelForm}
                        >
                            <span className={styles.hideInformation}>Cancel Form</span>
                            <CloseIcon aria-hidden="true" />
                        </button>
                    </div>
                </>
            ) : (
                <button
                    className={styles.addButton}
                    type="button"
                    onClick={() => setIsCreatingColumn(true)}
                >
                    + Add new column
                </button>
            )}
        </div>
    )
}

export default AddColumn
export type { AddColumnProps }
