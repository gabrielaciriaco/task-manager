const columnController = (columnService) => {
  const createColumn = async (req, res) => {
    const { title } = req.body
    const column = await columnService.createColumn(title)
    res.status(201).json(column)
  }

  const getColumns = async (req, res) => {
    const columns = await columnService.getColumns()
    res.status(200).json(columns)
  }

  const getColumnById = async (req, res) => {
    const { id } = req.params
    const column = await columnService.getColumnById(id)
    res.status(200).json(column)
  }

  const updateColumn = async (req, res) => {
    const { id } = req.params
    const { title, cards } = req.body
    const column = await columnService.updateColumn(id, title, cards)
    res.status(200).json(column)
  }

  const deleteColumn = async (req, res) => {
    const { id } = req.params
    await columnService.deleteColumn(id)
    res.status(204).send()
  }

  return {
    createColumn,
    getColumns,
    getColumnById,
    updateColumn,
    deleteColumn
  }
}

export default columnController
