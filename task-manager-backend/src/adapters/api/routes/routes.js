import express from 'express'

import * as columnUseCases from '../../../domain/useCases/column.js'
import * as cardUseCases from '../../../domain/useCases/card.js'
import * as userUseCases from '../../../domain/useCases/user.js'
import * as metricsUseCases from '../../../domain/useCases/metrics.js'

import cardController from '../controllers/cardController.js'
import columnController from '../controllers/columnController.js'
import userController from '../controllers/userController.js'
import metricsController from '../controllers/metricsController.js'

import authenticateToken from '../middlewares/authentication.js'

const router = express.Router()

const _cardController = cardController(cardUseCases)
const _columnController = columnController(columnUseCases)
const _userController = userController(userUseCases)
const _metricsController = metricsController(metricsUseCases)

router.get('/card', authenticateToken, _cardController.getCards)
router.post('/card', authenticateToken, _cardController.createCard)
router.put('/card/:id', authenticateToken, _cardController.updateCard)
router.delete('/card/:id', authenticateToken, _cardController.deleteCard)
router.put('/card/:id/move', authenticateToken, _cardController.moveCard)

router.get('/column', authenticateToken, _columnController.getColumns)
router.get('/column/:id', authenticateToken, _columnController.getColumnById)
router.post('/column', authenticateToken, _columnController.createColumn) //done
router.put('/column/:id', authenticateToken, _columnController.updateColumn)
router.delete('/column/:id', authenticateToken, _columnController.deleteColumn)

router.get('/user', authenticateToken, _userController.getUser)
router.post('/user', _userController.create)
router.post('/login', _userController.login)
router.put('/user/:email', authenticateToken, _userController.updateUser)

router.get('/metrics', authenticateToken, _metricsController.getMetrics)

router.get('/healthcheck', (_, res) => {
  res.send('OK')
})

export default router
