export default {
  data() {
    return {
      // jobs: [],
      // job: null
    }
  },
  computed: {
    jobs: {
      get() { return this.$store.state.queue.jobs },
      set(val) {
        val.forEach(row => (row._showDetails = false))
        this.$store.commit('queue/SET', { jobs: val })
      }
    },
    job: {
      get() { return this.$store.state.queue.job },
      set(val) { this.$store.commit('queue/SET', { job: val }) }
    },
    queues: {
      get() { return this.$store.state.queue.queues },
      set(val) { this.$store.commit('queue/SET', { queues: val }) }
    }
  },
  methods: {
    async getAllJobs(queueName) {
      this.jobs = await this.$axios.$get(`api/v1/redis/${queueName}/jobs`)
      this.$store.commit('queue/SET', { queueName })
    },
    async getJobById(queueName, id) {
      this.job = await this.$axios.$get(`api/v1/redis/${queueName}/jobs/${id}`)
      this.$store.commit('queue/SET', { queueName })
    },
    async getJobsByState(queueName, status) {
      this.jobs = await this.$axios.$get(`api/v1/redis/${queueName}/${status}`)
      this.$store.commit('queue/SET', { queueName })
    },
    addJobs(queueName) {
      this.$axios.$post(`api/v1/redis/${queueName}/jobs`, {})
    },
    pauseQueue(queueName) {
      this.$axios.$put(`api/v1/redis/${queueName}`, {})
    },
    retryFailed(queueName, jobs) {
      const ids = jobs.map(job => job.id)
      this.$axios.$put(`api/v1/redis/${queueName}/retry`, { ids })
    }
  }
}
