import mongoose from 'mongoose'

const CardSchema = mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Date,
    required: false
  }
})

const ColumnSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  cards: {
    type: [CardSchema],
    required: false
  }
})

const Column = mongoose.model('Column', ColumnSchema)
const Card = mongoose.model('Card', CardSchema)

export { Column, Card }
