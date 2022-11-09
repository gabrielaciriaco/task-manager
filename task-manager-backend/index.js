import mongoose from 'mongoose'
import server from './src/adapters/api/server.js'

function main() {
  mongoose.connect('mongodb://localhost:27018/task-manager').then(() => {
    console.log('Connected to MongoDB')
  })
  return server
}

main()
