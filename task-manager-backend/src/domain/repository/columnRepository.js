import Column from '../entities/column'

const columnRepository = {
  async createColumn(column) {
    const newColumn = new Column(column)
    return newColumn.save()
  },

  async getColumns() {
    return Column.find()
  },

  async getColumnById(id) {
    return Column.findById(id)
  },

  async updateColumn(id, column) {
    return Column.findByIdAndUpdate(id, column)
  },

  async deleteColumn(id) {
    return Column.findByIdAndDelete(id)
  }
}

export default columnRepository
