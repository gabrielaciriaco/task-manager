import { Column } from 'domains/board/models/Column'

type Board = {
    id: number
    title: string
    columns: Column[]
}

export type { Board }
