import React, { ReactElement, useContext, useEffect } from 'react'
import BoardColumn from 'domains/board/components/BoardColumn'
import AddColumn from 'domains/board/components/AddColumn'
import {
    DragDropContext,
    DraggableLocation,
    Droppable,
    DroppableProvided,
    DropResult,
} from 'react-beautiful-dnd'
import { editColumn, moveCard } from 'infra'
import BoardContext from 'domains/board/contexts/BoardContext'
import LoadingContext from 'contexts/LoadingContext'
import PageHeader from 'components/PageHeader'
import styles from './Board.module.scss'

function Board(): ReactElement {
    const { columns, refreshBoard } = useContext(BoardContext)
    const { showLoading, closeLoading } = useContext(LoadingContext)

    useEffect(() => {
        refreshBoard()
    }, [refreshBoard])

    function changeColumnIndex(source: DraggableLocation, destination: DraggableLocation) {
        const sourceIndex = source.index
        const destinationIndex = destination.index
        const sourceColumn = columns.filter((column) => column.index === sourceIndex)[0]

        showLoading()

        editColumn(sourceColumn.id, { title: sourceColumn.title, index: destinationIndex }).then(
            () => {
                refreshBoard()
                closeLoading()
            }
        )
    }

    function changeCardIndex(source: DraggableLocation, destination: DraggableLocation) {
        const sourceColumn = columns.filter((column) => column.id === source.droppableId)[0]
        const sourceCard = sourceColumn.cards[source.index]

        showLoading()

        moveCard(sourceCard.id, source.droppableId, destination.droppableId).then(() => {
            refreshBoard()
            closeLoading()
        })
    }

    const onDragEnd = (result: DropResult) => {
        const { type, destination, source } = result

        if (destination) {
            if (type === 'COLUMN') {
                changeColumnIndex(source, destination)
            } else {
                changeCardIndex(source, destination)
            }
        }
    }

    const getLastColumnIndex = (): number => {
        if (columns.length === 0) {
            return 0
        }

        return columns.sort((a, b) => b.index - a.index)[0].index + 1
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <PageHeader />
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={false}
            >
                {(provided: DroppableProvided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.board}
                    >
                        <div className={styles.columnWrapper}>
                            {columns
                                .sort((a, b) => a.index - b.index)
                                .map((column, index) => (
                                    <BoardColumn key={column.id} index={index} column={column} />
                                ))}
                            <AddColumn columnIndex={getLastColumnIndex()} />
                            {provided.placeholder}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board
