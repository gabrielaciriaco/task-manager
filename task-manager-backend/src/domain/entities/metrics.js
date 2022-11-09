class Metrics {
  constructor({
    cardsByUser,
    lastSemesterCards,
    cardsByColumn,
    cardsByUserInLastSemester
  }) {
    this.cardsByUser = cardsByUser
    this.lastSemesterCards = lastSemesterCards
    this.cardsByColumn = cardsByColumn
    this.cardsByUserInLastSemester = cardsByUserInLastSemester
  }
}

export default Metrics
