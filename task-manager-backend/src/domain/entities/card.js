class Card {
  constructor({ description, status, createdAt, updatedAt, id }) {
    this.description = description
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.id = id
  }
}

export default Card
