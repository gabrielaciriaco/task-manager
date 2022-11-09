import React, { ReactElement, ReactNode } from 'react'
import BoardProvider from 'domains/board/providers/BoardProvider'
import { StyledEngineProvider } from '@mui/material/styles'
import LoadingProvider from '../providers/LoadingProvider'

type ProvidersProps = {
    children: ReactNode
}

function Providers({ children }: ProvidersProps): ReactElement {
    return (
        <StyledEngineProvider injectFirst>
            <LoadingProvider>
                <BoardProvider>{children}</BoardProvider>
            </LoadingProvider>
        </StyledEngineProvider>
    )
}

export default Providers
