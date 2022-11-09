import express from 'express'
import cors from 'cors'
import config from '../config/config.js'

import routes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', routes)

const server = app.listen(config.port, async () => {
  console.log(`The server is running on port ${config.port}`)
})

export default server
