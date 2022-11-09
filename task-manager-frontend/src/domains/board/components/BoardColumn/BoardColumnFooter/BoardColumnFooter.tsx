import React, { ReactElement } from 'react'
import Button from 'components/Button'
import { CloseIcon } from 'components/Icons'
import styles from './BoardColumnFooter.module.scss'

type BoardColumnFooterProps = {
    isCreatingCard: boolean
    addCard: () => void
    saveNewCard: () => void
    cancelForm: () => void
}

function BoardColumnFooter({
    isCreatingCard,
    addCard,
    saveNewCard,
    cancelForm,
}: BoardColumnFooterProps): ReactElement {
    return (
        <div className={styles.footer}>
            {isCreatingCard ? (
                <>
                    <Button
                        type="button"
                        color="success"
                        variant="contained"
                        size="small"
                        onClick={saveNewCard}
                        className={styles.saveButton}
                    >
                        Save card
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
                </>
            ) : (
                <Button
                    className={styles.addButton}
                    type="button"
                    variant="outlined"
                    size="small"
                    onClick={addCard}
                >
                    + Add new card
                </Button>
            )}
        </div>
    )
}

export default BoardColumnFooter
export type { BoardColumnFooterProps }
