/* eslint-disable no-underscore-dangle */
import { Card } from 'domains/board/models/Card'
import { Column } from 'domains/board/models/Column'
import { get, remove, put, post } from './apiService'

type CardResponse = Omit<Card, 'id'> & { _id: string }

type ColumnResponse = Omit<Column, 'id' | 'cards'> & { _id: string; cards: CardResponse[] }

const formatCard = (card: CardResponse): Card => ({ ...card, id: card._id })

const formatColumn = (column: ColumnResponse): Column => ({
    ...column,
    id: column._id,
    cards: column.cards.map(formatCard),
})

const getColumns = (): Promise<Column[]> =>
    get('column').then((columns: ColumnResponse[]) => columns.map(formatColumn))

const createColumn = (column: Partial<Omit<Column, 'id'>>): Promise<void> => post('column', column)

const editColumn = (id: string, column: Partial<Omit<Column, 'id'>>): Promise<void> =>
    put('column', id, column)

const deleteColumn = (id: string): Promise<void> => remove('column', id)

export { getColumns, deleteColumn, editColumn, createColumn }
