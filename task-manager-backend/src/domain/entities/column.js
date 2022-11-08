import mongoose from 'mongoose' //TODO this may be better fit in the adapter layer and should be moved there

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cards: {
    type: Array,
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

const Column = mongoose.model('Column', columnSchema)

export default Column
