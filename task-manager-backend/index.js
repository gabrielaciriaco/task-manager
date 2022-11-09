import mongoose from 'mongoose'
import server from './src/adapters/api/server.js'

function main() {
  //TODO: move to config
  // to run it local mongodb://localhost:27018/task-manager
  mongoose.connect('mongodb://mongo:27017/task-manager').then(() => {
    console.log('Connected to MongoDB')
  })
  return server
}

main()
