const queues = require('./queue')
module.exports = {
  getQueueNames,
  getJobCounts,
  getJobsByState,
  getJobById,
  getJobsById,
  retryJobs,
  getAllJobsInQueue,
  jobClassToObject,
  updateJobData,
  getQueueState,
  getQueueNameAndState
}

function getQueueState(queueName) {
  return queues[queueName].isPaused()
}

async function getQueueNameAndState() {
  const queueNames = getQueueNames()
  for (let i = 0; i < queueNames.length; i++) {
    const { name } = queueNames[i]
    queueNames[i].isPaused = await getQueueState(name)
  }
  return queueNames
}

async function updateJobData(queueName, id, data) {
  const job = await getJobById(queueName, id)
  job.update(data)
}

async function getJobsById(queueName, ids) {
  const jobs = []
  for (let i = 0; i < ids.length; i++) {
    const job = await getJobById(queueName, ids[i])
    jobs.push(job)
  }
  return jobs
}

async function retryJobs(jobs) {
  for (let i = 0; i < jobs.length; i++) {
    await jobs[i].retry()
  }
}

function getQueueNames() {
  return Object.keys(queues)
    .map(qName => ({ name: qName }))
}
function getJobCounts (queueName) {
  return queues[queueName].getJobCounts()
}

function getJobsByState(queueName, status) {
  return queues[queueName].getJobs([status])
}
async function getJobById(queueName, id) {
  const queue = queues[queueName]
  const job = await queue.getJob(id)
  job.state = await job.getState()
  return job
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
