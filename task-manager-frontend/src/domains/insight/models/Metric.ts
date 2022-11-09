type Metrics = {
    cardsByUser: { [key: string]: number }
    cardsByColumn: { [key: string]: number }
    cardsByUserInLastSemester: { [key: string]: { [key: string]: number } }
    lastSemesterCards: { [key: string]: number }
}

export type { Metrics }
