import React, { ReactElement, ReactNode, useCallback, useContext, useState } from 'react'
import { Column } from 'domains/board/models/Column'
import { getColumns } from 'infra'
import LoadingContext from 'contexts/LoadingContext'
import BoardContext from '../contexts/BoardContext'

type BoardProviderProps = {
    children: ReactNode
}

const BoardProvider = ({ children }: BoardProviderProps): ReactElement => {
    const [columns, setColumns] = useState<Column[]>([])
    const { showLoading, closeLoading } = useContext(LoadingContext)

    const refreshBoard = useCallback(
        function refreshBoard() {
            showLoading()
            getColumns().then((fetchedColumns: Column[]) => {
                setColumns(fetchedColumns)
                closeLoading()
            })
        },
        [showLoading, closeLoading]
    )

    const value = React.useMemo(
        () => ({
            columns,
            refreshBoard,
        }),
        [refreshBoard, columns]
    )

    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}

export default BoardProvider
