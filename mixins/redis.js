export default {
  computed: {
    jobs: {
      get() { return this.$store.state.queue.jobs },
      set(val) {
        val.forEach(row => (row._showDetails = false))
        this.$store.dispatch('queue/set', { jobs: val })
      }
    },
    job: {
      get() { return this.$store.state.queue.job },
      set(val) { this.$store.dispatch('queue/set', { job: val }) }
    },
    queues: {
      get() { return this.$store.state.queue.queues },
      set(val) { this.$store.dispatch('queue/set', { queues: val }) }
    },
    allQueuesPaused: {
      get() { return this.$store.state.queue.allQueuesPaused },
      set(val) { this.$store.dispatch('queue/set', { allQueuesPaused: val }) }
    }
  },
  methods: {
    async getAllJobs(queueName) {
      this.jobs = await this.$axios.$get(`api/v1/redis/${queueName}/jobs`)
      this.$store.dispatch('queue/set', { queueName })
    },
    async getJobById(queueName, id) {
      this.jobs = await this.$axios.$get(`api/v1/redis/${queueName}/jobs/${id}`)
      this.$store.dispatch('queue/set', { queueName })
    },
    async getJobsByState(queueName, status) {
      this.jobs = await this.$axios.$get(`api/v1/redis/${queueName}/${status}`)
      this.$store.dispatch('queue/set', { queueName })
    },
    addJobs(queueName) {
      this.$axios.$post(`api/v1/redis/${queueName}/jobs`, {})
    },
    pauseQueue(queueName) {
      this.$store.dispatch('queue/setQueueProp', {
        queueName,
        propName: 'isPaused',
        val: !this.queues[queueName].isPaused
      })
      this.$axios.$put(`api/v1/redis/${queueName}`, { paused: this.queues[queueName].isPaused })
    },
    pauseAllQueues() {
      this.allQueuesPaused = !this.allQueuesPaused
      for (const key in this.queues) {
        this.pauseQueue(this.queues[key].name)
      }
    },
    retryFailed(queueName, jobs) {
      const ids = jobs.map(job => job.id)
      this.$axios.$put(`api/v1/redis/${queueName}/retry`, { ids })
    },
    updateJobData(queueName, id, data) {
      this.$axios.$put(`api/v1/redis/${queueName}/update`, { id, data })
    }
  }
}
