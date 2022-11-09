import React, { ReactElement } from 'react'
import Select from 'components/Select'
import MenuItem from 'components/MenuItem'
import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import { SelectChangeEvent } from '@mui/material/Select'

type CriticityLevelSelectProps = {
    className?: string
    status?: CriticityLevel
    handleChange: (status?: CriticityLevel) => void
}

function CriticityLevelSelect({
    className,
    status,
    handleChange,
}: CriticityLevelSelectProps): ReactElement {
    const handleCriticityChange = (event: SelectChangeEvent<unknown>) => {
        const updatedValue = event.target.value === '' ? undefined : event.target.value

        handleChange(updatedValue as CriticityLevel | undefined)
    }

    return (
        <Select
            className={className}
            size="small"
            value={status ?? ''}
            displayEmpty
            onChange={handleCriticityChange}
        >
            <MenuItem value="">Criticity</MenuItem>
            <MenuItem value={CriticityLevel.LOW}>Low</MenuItem>
            <MenuItem value={CriticityLevel.MEDIUM}>Medium</MenuItem>
            <MenuItem value={CriticityLevel.HIGH}>High</MenuItem>
        </Select>
    )
}

export default CriticityLevelSelect
export type { CriticityLevelSelectProps }
