import Column from '../entities/column.js'
import { v4 as uuidv4 } from 'uuid'
import columnRepository from '../../adapters/repository/columnRepository.js'

const createColumn = (title) => {
  const column = new Column({
    title,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uuidv4(),
    cards: []
  })

  return columnRepository.createOneAsync(column)
}

const getColumns = () => {
  return columnRepository.getAllAsync()
}

const getColumnById = (id) => {
  return columnRepository.getByIdAsync(id)
}

const updateColumn = (id, title, cards) => {
  const column = new Column({
    title,
    updatedAt: new Date(),
    id,
    cards
  })
  return columnRepository.updateByIdAsync(id, column)
}

const deleteColumn = (id) => {
  return columnRepository.deleteOneAsync(id)
}

export { createColumn, getColumns, getColumnById, updateColumn, deleteColumn }
