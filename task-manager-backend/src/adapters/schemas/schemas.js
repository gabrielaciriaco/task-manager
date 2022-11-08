import mongoose from 'mongoose'

const CardSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  status: {
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
  id: {
    type: String,
    required: true
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Card',
    required: false
  }
})

const Column = mongoose.model('Column', ColumnSchema)
const Card = mongoose.model('Card', CardSchema)

export { Column, Card }
