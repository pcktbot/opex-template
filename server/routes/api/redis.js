const queues = require('../../controllers/queue')

module.exports = (app) => {
  // Get all Jobs from the queue
  app.get('/api/v1/redis/:queueName/jobs', async (req, res) => {
    const { queueName } = req.params
    const queue = queues[queueName]
    const jobs = await queue.getJobs()
    const jobsAndState = []
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i]
      const state = await job.getState()
      jobsAndState.push({ job, state })
    }
    res.json(jobsAndState)
  })

  // Get job info by Id
  app.get('/api/v1/redis/:queueName/jobs/:id', async (req, res) => {
    const { id, queueName } = req.params
    const queue = queues[queueName]
    const job = await queue.getJob(id)
    const state = await job.getState()
    res.json({ job, state })
  })

  // End Non Standard Routs

  // Begin Standard names

  // Get all queue names
  app.get('/api/v1/redis', (req, res) => {
    const queueNames = Object.keys(queues)
      .filter(qName => qName !== 'init')
      .map(qName => ({ name: qName }))
    res.json(queueNames)
  })

  // Get status job counts
  app.get('/api/v1/redis/:queueName', async (req, res) => {
    const { queueName } = req.params
    const jobCounts = await queues[queueName].getJobCounts()
    res.json(jobCounts)
  })

  // Get all jobs with a certian status
  app.get('/api/v1/redis/:queueName/:status', async (req, res) => {
    const { queueName, status } = req.params
    const queue = queues[queueName]
    const jobs = await queue.getJobs([status])
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
