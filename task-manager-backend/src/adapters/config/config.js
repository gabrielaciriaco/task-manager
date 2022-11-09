import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || '5001',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  expirationTime: process.env.EXPIRATION_TIME || '1h'
}

export default config
