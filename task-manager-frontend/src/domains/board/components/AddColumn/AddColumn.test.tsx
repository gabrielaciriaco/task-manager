import { act, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { render, screen } from 'utils/testUtils'
import { createColumn } from 'infra'
import AddColumn from './AddColumn'

jest.mock('infra')

test('When user clicks on add column should show a input and action buttons', () => {
    render(<AddColumn columnIndex={1} />)

    fireEvent.click(screen.getByRole('button', { name: '+ Add new column' }))

    expect(screen.getByPlaceholderText('Enter column title...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save column' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel Form' })).toBeInTheDocument()
    expect(screen.getByText('Cancel Form')).toBeInTheDocument()
})

test('When user clicks on cancel form should hide the textarea and action buttons', () => {
    render(<AddColumn columnIndex={1} />)

    fireEvent.click(screen.getByRole('button', { name: '+ Add new column' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel Form' }))

    expect(screen.queryByPlaceholderText('Enter column title...')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Save column' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
})

test('When user clicks on save card should hide the textarea and action buttons', async () => {
    const mockedCreateColumn = createColumn as jest.Mock
    mockedCreateColumn.mockResolvedValue(null)

    render(<AddColumn columnIndex={1} />)
    fireEvent.click(screen.getByRole('button', { name: '+ Add new column' }))

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'Save column' }))
    })

    await waitFor(() => {
        expect(screen.queryByPlaceholderText('Enter column title...')).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Save column' })).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Cancel Form' })).not.toBeInTheDocument()
        expect(screen.queryByText('Cancel Form')).not.toBeInTheDocument()
    })
})
