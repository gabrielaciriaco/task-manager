import { CriticityLevel } from '../enums/CriticityLevel'

type Card = {
    id: string
    description: string
    status?: CriticityLevel
}

export type { Card }
