import mongoose from 'mongoose'

const CardSchema = mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  status: {
    type: Number,
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
  },
  email: {
    type: String,
    required: false
  }
})

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false
  },
  changePasswordToken: {
    type: String,
    required: false
  }
})

const Column = mongoose.model('Column', ColumnSchema)
const Card = mongoose.model('Card', CardSchema)
const User = mongoose.model('User', UserSchema)

export { Column, Card, User }
