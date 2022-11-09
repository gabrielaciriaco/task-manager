import express from 'express'

import cardController from '../controllers/cardController.js'
import columnController from '../controllers/columnController.js'

const router = express.Router()

const cardUseCases = cardController()
const columnUseCases = columnController()

router.get('/card', cardUseCases.getCards)
router.post('/card', cardUseCases.createCard)
router.put('/card/:id', cardUseCases.updateCard)
router.delete('/card/:id', cardUseCases.deleteCard)

router.get('/column', columnUseCases.getColumns)
router.get('/column/:id', columnUseCases.getColumnById)
router.post('/column', columnUseCases.createColumn)
router.put('/column/:id', columnUseCases.updateColumn)
router.delete('/column/:id', columnUseCases.deleteColumn)

router.get('/healthcheck', (_, res) => {
  res.send('OK')
})

export default router
