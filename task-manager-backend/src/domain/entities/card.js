import mongoose from 'mongoose' //TODO this may be better fit in the adapter layer and should be moved there

const cardSchema = new mongoose.Schema({
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
  }
})

const Card = mongoose.model('Card', cardSchema)

export default Card
