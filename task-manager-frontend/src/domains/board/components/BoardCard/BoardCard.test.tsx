import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { Card } from 'domains/board/models/Card'
import React from 'react'
import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { act, fireEvent, render, screen, waitFor, within } from 'utils/testUtils'
import { deleteCard, editCard } from 'infra'
import BoardCard, { BoardCardProps } from './BoardCard'

jest.mock('infra')

function renderComponent(props: BoardCardProps) {
    render(
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId="1_column" type="QUOTE" ignoreContainerClipping={false}>
                {(dropProvided: DroppableProvided) => (
                    <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                        <BoardCard {...props} />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

test('When BoardCard renders should show card description', () => {
    const card: Card = {
        id: '1',
        description: 'description',
    }

    renderComponent({ card, index: 0, columnId: '1' })

    expect(screen.getByText('description')).toBeInTheDocument()
})

test('Given card without a status When BoardCard renders should does not show card status', () => {
    const card: Card = {
        id: '1',
        description: 'description',
    }

    renderComponent({ card, index: 0, columnId: '1' })

    expect(screen.queryByText('Low Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Low Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('Medium Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Medium Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('High Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('High Criticity')).not.toBeInTheDocument()
})

test('Given card with a status When BoardCard renders should have status description', () => {
    const card: Card = {
        id: '1',
        description: 'description',
        status: CriticityLevel.LOW,
    }

    renderComponent({ card, index: 0, columnId: '1' })

    expect(screen.getByTitle('Low Criticity')).toBeInTheDocument()
    expect(screen.getByText('Low Criticity')).toBeInTheDocument()
})

test('When user clicks on editIcon should show the editModal with correct values', () => {
    const card: Card = {
        id: '1',
        description: 'description',
        status: CriticityLevel.LOW,
    }

    renderComponent({ card, index: 0, columnId: '1' })

    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    const dialog = screen.getByRole('dialog')
    const descriptionTextarea = within(dialog).getByPlaceholderText(
        'Enter a description for this card…'
    ) as HTMLTextAreaElement

    expect(descriptionTextarea.value).toBe(card.description)
    expect(within(dialog).getByText('Low Criticity')).toBeInTheDocument()
    expect(within(dialog).getByTitle('Low Criticity')).toBeInTheDocument()
})

test('When user clicks on save button should hide modal', async () => {
    const mockedEditCard = editCard as jest.Mock
    mockedEditCard.mockResolvedValue(null)

    const card: Card = {
        id: '1',
        description: 'description',
        status: CriticityLevel.LOW,
    }

    renderComponent({ card, index: 0, columnId: '1' })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    })

    await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
})

test(`Given user is delleting a card When user clicks on continue 
    button inside confirmation modal should close modal`, async () => {
    const mockedDeleteCard = deleteCard as jest.Mock
    mockedDeleteCard.mockResolvedValue(null)

    const card: Card = {
        id: '1',
        description: 'description',
        status: CriticityLevel.LOW,
    }

    renderComponent({ card, index: 0, columnId: '1' })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    })

    await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
})

test('When user clicks outside of modal should hide modal', () => {
    const card: Card = {
        id: '1',
        description: 'description',
        status: CriticityLevel.LOW,
    }

    renderComponent({ card, index: 0, columnId: '1' })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    fireEvent.click(screen.getByTestId('dialog-backdrop'))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('When user press Esc should hide modal', () => {
    const card: Card = {
        id: '1',
        description: 'description',
        status: CriticityLevel.LOW,
    }

    renderComponent({ card, index: 0, columnId: '1' })
    fireEvent.click(screen.getByRole('button', { name: 'Edit Card' }))

    fireEvent.keyDown(document, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
    })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
