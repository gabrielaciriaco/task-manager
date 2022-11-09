const metricsController = (metricsService) => {
  const getMetrics = async (req, res) => {
    const metrics = await metricsService.getMetrics()
    res.status(200).json(metrics)
  }

  return {
    getMetrics
  }
}

export default metricsController
