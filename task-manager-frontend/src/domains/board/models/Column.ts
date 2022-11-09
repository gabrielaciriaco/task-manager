import { Card } from 'domains/board/models/Card'

type Column = {
    id: string
    index: number
    title: string
    cards: Card[]
}

export type { Column }
