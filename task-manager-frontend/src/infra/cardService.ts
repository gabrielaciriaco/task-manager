import { Card } from 'domains/board/models/Card'
import { post, put, remove } from './apiService'

const createCard = (card: Omit<Card, 'id'>, columnId: string): Promise<void> =>
    post('card', { ...card, columnId })

const editCard = (id: string, card: Partial<Omit<Card, 'id'>>, columnId: string): Promise<void> =>
    put('card', id, { ...card, columnId })

const moveCard = (id: string, columnId: string, newColumnId: string): Promise<void> =>
    put(`card/${id}/move`, '', { columnId, newColumnId })

const deleteCard = (id: string, columnId: string): Promise<void> => remove('card', id, { columnId })

export { createCard, editCard, moveCard, deleteCard }
