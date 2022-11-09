const cardController = (cardService) => {
  const createCard = async (req, res) => {
    const { description, status, columnId } = req.body
    const card = await cardService.createCard(description, status, columnId)
    res.status(201).json(card)
  }

  const getCards = async (req, res) => {
    const cards = await cardService.getCards()
    res.status(200).json(cards)
  }

  const updateCard = async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    const card = await cardService.updateCard(id, title, description)
    res.status(200).json(card)
  }

  const deleteCard = async (req, res) => {
    const { id } = req.params
    await cardService.deleteCard(id)
    res.status(204).send()
  }

  return {
    createCard,
    getCards,
    updateCard,
    deleteCard
  }
}

export default cardController
