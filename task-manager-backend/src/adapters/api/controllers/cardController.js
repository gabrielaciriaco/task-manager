const cardController = (cardService) => {
  const createCard = async (req, res) => {
    const { description, status, columnId } = req.body
    const card = await cardService.createCard(description, status, columnId)
    res.status(201).json(card)
  }

  const getCards = async (_, res) => {
    const cards = await cardService.getCards()
    res.status(200).json(cards)
  }

  const updateCard = async (req, res) => {
    const { id } = req.params
    const { status, description, columnId } = req.body
    const card = await cardService.updateCard(id, description, status, columnId)
    res.status(200).json(card)
  }

  const deleteCard = async (req, res) => {
    const { id } = req.params
    const { columnId } = req.body
    await cardService.deleteCard(id, columnId)
    res.status(204).send()
  }

  const moveCard = async (req, res) => {
    const { id } = req.params
    const { columnId, newColumnId } = req.body
    const card = await cardService.moveCard(id, columnId, newColumnId)
    res.status(200).json(card)
  }

  return {
    createCard,
    getCards,
    updateCard,
    deleteCard,
    moveCard
  }
}

export default cardController
