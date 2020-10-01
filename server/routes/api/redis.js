const queues = require('../../controllers/queue')
const redis = require('../../controllers/redis')
module.exports = (app) => {
  // Get all Jobs from the queue
  app.get('/api/v1/redis/:queueName/jobs', async (req, res) => {
    const { queueName } = req.params
    const jobs = await redis.getAllJobsInQueue(queueName)
    res.json(jobs)
  })

  // Get job info by Id
  app.get('/api/v1/redis/:queueName/jobs/:id', async (req, res) => {
    const { id, queueName } = req.params
    const job = await redis.getJobById(queueName, id)
    res.json(redis.jobClassToObject(job))
  })

  //Retry all jobs in queue
  app.put('/api/v1/redis/:queueName/retry', async (req, res) => {
    const { queueName } = req.params
    const { ids } = req.body
    const jobs = await redis.getJobsById(queueName, ids)
    await redis.retryJobs(jobs)
    res.sendStatus(200)
  })

  // End Non Standard Routs

  // Begin Standard names
  // Get all queue names
  app.get('/api/v1/redis', (req, res) => {
    res.json(redis.getQueueNames())
  })

  // Get status job counts
  app.get('/api/v1/redis/:queueName', async (req, res) => {
    const { queueName } = req.params
    const jobCounts = await redis.getJobCounts(queueName)
    res.json(jobCounts)
  })

  // Get all jobs with a certian status
  app.get('/api/v1/redis/:queueName/:status', async (req, res) => {
    const { queueName, status } = req.params
    const jobs = await redis.getJobsByStatus(queueName, status)
    res.json(jobs)
  })

  // Add or BulkAdd Jobs
  app.post('/api/v1/redis/:queueName/jobs', async (req, res) => {
    const { body } = req.body
    const { queueName } = req.params
    if (Array.isArray(body)) {
      await queues[queueName].bulkAdd(body)
    } else {
      await queues[queueName].add(body)
    }
    res.sendStatus(200)
  })

  // PAUSE OR RESUME QUEUE
  app.put('/api/v1/redis/:queueName', async (req, res) => {
    const { queueName } = req.params
    const { body } = req
    const queue = queues[queueName]
    if (body.paused) {
      await queue.pause()
    } else if (!body.paused) {
      await queue.resume()
    }
    res.sendStatus(200)
  })

  // END STANDARD ROUTES
}
