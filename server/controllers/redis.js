const queues = require('./queue')
module.exports = {
  getQueueNames,
  getJobCounts,
  getJobsByStatus,
  getJobById,
  getAllJobsInQueue
}

function getQueueNames() {
  return Object.keys(queues)
    .map(qName => ({ name: qName }))
}
function getJobCounts (queueName) {
  return queues[queueName].getJobCounts()
}

function getJobsByStatus(queueName, status) {
  return queues[queueName].getJobs([status])
}
async function getJobById(queueName, id) {
  const queue = queues[queueName]
  const job = await queue.getJob(id)
  job.state = await job.getState()
  return jobClassToObject(job)
}

async function getAllJobsInQueue(queueName) {
  const queue = queues[queueName]
  const jobs = await queue.getJobs()
  const jobsAndState = []
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    job.state = await job.getState()
    jobsAndState.push(jobClassToObject(job))
  }
  return jobsAndState
}

function jobClassToObject(c) {
  return Object.keys(c)
    .filter(k => k !== 'queue')
    .map(k => ({ [k]: c[k] }))
    .reduce((res, o) => Object.assign(res, o), {})
}
