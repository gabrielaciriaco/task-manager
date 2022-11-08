import Card from '../entities/card'

const cardRepository = {
  async createCard(card) {
    const newCard = new Card(card)
    return newCard.save()
  },

  async getCards() {
    return Card.find()
  },

  async getCardById(id) {
    return Card.findById(id)
  },

  async updateCard(id, card) {
    return Card.findByIdAndUpdate(id, card)
  },

  async deleteCard(id) {
    return Card.findByIdAndDelete(id)
  }
}

export default cardRepository
