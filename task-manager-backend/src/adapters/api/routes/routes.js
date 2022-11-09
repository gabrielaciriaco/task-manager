import express from 'express'

import * as columnUseCases from '../../../domain/useCases/column.js'
import * as cardUseCases from '../../../domain/useCases/card.js'
import cardController from '../controllers/cardController.js'
import columnController from '../controllers/columnController.js'

const router = express.Router()

const _cardController = cardController(cardUseCases)
const _columnController = columnController(columnUseCases)

router.get('/card', _cardController.getCards)
router.post('/card', _cardController.createCard)
router.put('/card/:id', _cardController.updateCard)
router.delete('/card/:id', _cardController.deleteCard)
router.put('/card/:id/move', _cardController.moveCard)

router.get('/column', _columnController.getColumns)
router.get('/column/:id', _columnController.getColumnById)
router.post('/column', _columnController.createColumn)
router.put('/column/:id', _columnController.updateColumn)
router.delete('/column/:id', _columnController.deleteColumn)

router.get('/healthcheck', (_, res) => {
  res.send('OK')
})

export default router
