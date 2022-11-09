import { Column, Card } from '../schemas/schemas.js'

const columnRepository = {
  async createOneAsync(column) {
    const newColumn = new Column({
      title: column.title,
      createdAt: column.createdAt,
      updatedAt: column.updatedAt,
      id: column.id,
      cards: column.cards
    })
    return Column.create(newColumn)
  },

  async getAllAsync() {
    return Column.find({})
  },

  async getAllCardsAsync() {
    const columns = await Column.find({})
    const cards = columns.flatMap((column) => column.cards)
    return cards
  },

  async updateCardAsync(id, card, columnId) {
    const column = await Column.findById(columnId)
    const cardIndex = column.cards.findIndex((card) => card.id === id)

    return Column.updateOne(column, {
      $set: {
        [`cards.${cardIndex}.description`]: card.description,
        [`cards.${cardIndex}.status`]: card.status,
        [`cards.${cardIndex}.updatedAt`]: card.updatedAt
      },
      arrayFilters: [{ 'card.id': id }]
    })
  },

  async deleteCardAsync(id, columnId) {
    const column = await Column.findById(columnId)
    await column.cards.pull({ _id: id })
    return column.save()
  },

  async getByIdAsync(id) {
    return Column.findById(id)
  },

  async updateByIdAsync(id, column) {
    return Column.findByIdAndUpdate(id, column)
  },

  async createCardAsync(columnId, card) {
    const newCard = new Card({
      description: card.description,
      status: card.status,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt
    })
    return Column.findByIdAndUpdate(columnId, {
      $push: { cards: newCard }
    })
  },

  async moveCardAsync(id, columnId, newColumnId) {
    const column = await Column.findById(columnId)
    const card = column.cards.find((card) => card.id === id)
    this.deleteCardAsync(id, columnId)
    return this.createCardAsync(newColumnId, card)
  },

  async deleteOneAsync(id) {
    return Column.findByIdAndDelete(id)
  }
}

export default columnRepository
