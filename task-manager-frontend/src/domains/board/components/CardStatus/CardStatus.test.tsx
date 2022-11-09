import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import React from 'react'
import { render, screen } from 'utils/testUtils'
import CardStatus from './CardStatus'

test('Given card without a status When CardStatus renders should does not show card description', () => {
    render(<CardStatus />)

    expect(screen.queryByText('Low Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Low Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('Medium Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Medium Criticity')).not.toBeInTheDocument()

    expect(screen.queryByText('High Criticity')).not.toBeInTheDocument()
    expect(screen.queryByTitle('High Criticity')).not.toBeInTheDocument()
})

test.each([
    [CriticityLevel.LOW, 'Low Criticity'],
    [CriticityLevel.MEDIUM, 'Medium Criticity'],
    [CriticityLevel.HIGH, 'High Criticity'],
])(
    'Given card with a status When CardStatus renders should have status description',
    (criticityLevel, statusDescription) => {
        render(<CardStatus status={criticityLevel} />)

        expect(screen.getByTitle(statusDescription)).toBeInTheDocument()
        expect(screen.getByText(statusDescription)).toBeInTheDocument()
    }
)
