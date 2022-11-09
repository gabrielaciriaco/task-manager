import Metrics from '../entities/metrics.js'
import columnRepository from '../../adapters/repository/columnRepository.js'

const getMetrics = async () => {
  const columns = await columnRepository.getAllAsync()

  const fullColumnsByUser = columns.reduce((acc, column) => {
    if (!acc[column.email]) {
      acc[column.email] = []
    }
    acc[column.email].push(column)
    return acc
  }, {})

  const cardsByUser = Object.keys(fullColumnsByUser).reduce((acc, user) => {
    const cards = fullColumnsByUser[user].flatMap((column) => column.cards)
    acc[user] = cards
    return acc
  }, {})

  const countCardsByUser = Object.keys(cardsByUser).reduce((acc, user) => {
    acc[user] = cardsByUser[user].length
    return acc
  }, {})

  const cardsByUserByMonthLastSixMonths = Object.keys(cardsByUser).reduce(
    (acc, user) => {
      const cards = cardsByUser[user]
      const cardsByMonth = cards.reduce((acc, card) => {
        const month = card.createdAt.getMonth()
        if (!acc[month]) {
          acc[month] = []
        }
        acc[month].push(card)
        return acc
      }, {})
      acc[user] = cardsByMonth
      return acc
    },
    {}
  )

  const countCardsByUserByMonthLastSixMonths = Object.keys(
    cardsByUserByMonthLastSixMonths
  ).reduce((acc, user) => {
    const cardsByMonth = cardsByUserByMonthLastSixMonths[user]
    const countCardsByMonth = Object.keys(cardsByMonth).reduce((acc, month) => {
      acc[month] = cardsByMonth[month].length
      return acc
    }, {})
    acc[user] = countCardsByMonth
    return acc
  }, {})

  const countCardsByMonthLastSixMonths = Object.keys(
    countCardsByUserByMonthLastSixMonths
  ).reduce((acc, user) => {
    const countCardsByMonth = countCardsByUserByMonthLastSixMonths[user]
    Object.keys(countCardsByMonth).forEach((month) => {
      if (!acc[month]) {
        acc[month] = 0
      }
      acc[month] += countCardsByMonth[month]
    })
    return acc
  }, {})

  const cardsByColumn = columns.reduce((acc, column) => {
    if (!acc[column.title]) {
      acc[column.title] = []
    }
    acc[column.title].push(...column.cards)
    return acc
  }, {})

  const countCardsByColumn = Object.keys(cardsByColumn).reduce(
    (acc, column) => {
      acc[column] = cardsByColumn[column].length
      return acc
    },
    {}
  )

  const metrics = new Metrics({
    cardsByUser: countCardsByUser,
    cardsByUserInLastSemester: countCardsByUserByMonthLastSixMonths,
    cardsByColumn: countCardsByColumn,
    lastSemesterCards: countCardsByMonthLastSixMonths
  })

  return metrics
}

export { getMetrics }
