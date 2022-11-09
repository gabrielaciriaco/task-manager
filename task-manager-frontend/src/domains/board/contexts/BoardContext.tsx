import { createContext } from 'react'
import { Column } from 'domains/board/models/Column'

type BoardContextType = {
    refreshBoard: () => void
    columns: Column[]
}

const BoardContext = createContext<BoardContextType>({
    refreshBoard: () => {},
    columns: [],
})

export default BoardContext
