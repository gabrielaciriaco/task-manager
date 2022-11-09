class Column {
  constructor({ title, createdAt, updatedAt, id, cards, email }) {
    this.title = title
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.id = id
    this.cards = cards
    this.email = email
  }
}

export default Column
