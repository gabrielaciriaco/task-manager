import { v4 as uuidv4 } from 'uuid'

import { Column } from '../schemas/schemas.js'

const columnRepository = {
  async createOneAsync(title) {
    const newColumn = new Column({
      title: title,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: uuidv4(),
      cards: []
    })
    return Column.create(newColumn)
  },

  async getAllAsync() {
    return Column.find({})
  },

  async getByIdAsync(id) {
    return Column.findById(id)
  },

  async updateByIdAsync(id, column) {
    return Column.findByIdAndUpdate(id, column)
  },

  async deleteOneAsync(id) {
    return Column.findByIdAndDelete(id)
  }
}

export default columnRepository
