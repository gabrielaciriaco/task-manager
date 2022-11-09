import Card from '../entities/card.js'
import columnRepository from '../../adapters/repository/columnRepository.js'

const createCard = (description, status, columnId) => {
  const card = new Card({
    description,
    status,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  return columnRepository.createCardAsync(columnId, card)
}

const getCards = () => {
  return columnRepository.getAllCardsAsync()
}

const updateCard = (id, description, status, columnId) => {
  const card = new Card({
    description,
    status,
    updatedAt: new Date()
  })
  return columnRepository.updateCardAsync(id, card, columnId)
}

const deleteCard = (id, columnId) => {
  return columnRepository.deleteCardAsync(id, columnId)
}

const moveCard = (id, columnId, newColumnId) => {
  return columnRepository.moveCardAsync(id, columnId, newColumnId)
}

export { createCard, getCards, updateCard, deleteCard, moveCard }
