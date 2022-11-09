import { get } from './apiService'

const getMetrics = () => get('metrics')

export { getMetrics }
