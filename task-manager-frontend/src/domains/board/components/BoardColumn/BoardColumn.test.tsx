import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { Column } from 'domains/board/models/Column'
import React from 'react'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { act, fireEvent, render, screen, waitFor, within } from 'utils/testUtils'
import { createCard } from 'infra'
import BoardColumn, { BoardColumnProps } from './BoardColumn'

jest.mock('infra')

function renderComponent(props: BoardColumnProps) {
    render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="board" type="LIST" ignoreContainerClipping={false}>
                {(dropProvided: DroppableProvided) => (
                    <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                        <BoardColumn {...props} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

test('When BoardColumn renders should show column title', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ column, index: 0 })

    expect(screen.getByText('Title')).toBeInTheDocument()
})

test('Given a column does not have a card When BoardColumn renders should does not show a card', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ column, index: 0 })

    expect(screen.queryByTestId('board-card')).not.toBeInTheDocument()
})

test('Given a column has a card When BoardColumn renders should show a card with correct values', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [
            {
                id: '1',
                description: 'description',
                status: CriticityLevel.LOW,
            },
        ],
    }

    renderComponent({ column, index: 0 })

    expect(screen.getByText('description')).toBeInTheDocument()
    expect(screen.getByTitle('Low Criticity')).toBeInTheDocument()
    expect(screen.getByText('Low Criticity')).toBeInTheDocument()
})

test('Given a column has more than one card When BoardColumn renders should show all cards', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [
            {
                id: '1',
                description: 'description',
                status: CriticityLevel.LOW,
            },
            {
                id: '2',
                description: 'description 2',
                status: CriticityLevel.LOW,
            },
            {
                id: '3',
                description: 'description 3',
                status: CriticityLevel.LOW,
            },
        ],
    }

    renderComponent({ column, index: 0 })

    expect(screen.getAllByTestId('board-card')).toHaveLength(3)
})

test('When user clicks on add card should show a textarea and action buttons', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ column, index: 0 })

    fireEvent.click(screen.getByRole('button', { name: '+ Add new card' }))

    expect(screen.getByPlaceholderText('Enter a description for this card…')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save card' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel Form' })).toBeInTheDocument()
    expect(screen.getByText('Cancel Form')).toBeInTheDocument()
})

test('When user clicks on cancel form should hide the textarea and action buttons', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ column, index: 0 })

    fireEvent.click(screen.getByRole('button', { name: '+ Add new card' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel Form' }))

    expect(
        screen.queryByPlaceholderText('Enter a description for this card…')
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Save card' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
})

test('When user clicks on save card should hide the textarea and action buttons', async () => {
    const mockedCreateCard = createCard as jest.Mock
    mockedCreateCard.mockResolvedValue(null)

    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ column, index: 0 })
    fireEvent.click(screen.getByRole('button', { name: '+ Add new card' }))

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Save card' }))
    })

    await waitFor(() => {
        expect(
            screen.queryByPlaceholderText('Enter a description for this card…')
        ).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Save card' })).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
        expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
    })
})

test('When user clicks on trash icon should show the confirmation modal', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ column, index: 0 })

    fireEvent.click(screen.getByRole('button', { name: 'Delete Column' }))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByText('Delete Column')).toBeInTheDocument()
    expect(
        within(dialog).getByText('Do you really want to delete this record?')
    ).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: 'Continue' })).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test('When user clicks on close button inside the confirmation modal should hide the modal', () => {
    const column: Column = {
        id: '1',
        index: 1,
        title: 'Title',
        cards: [],
    }

    renderComponent({ column, index: 0 })
    fireEvent.click(screen.getByRole('button', { name: 'Delete Column' }))

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByText('Delete Card')).not.toBeInTheDocument()
    expect(screen.queryByText('Do you really want to delete this record?')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
})
