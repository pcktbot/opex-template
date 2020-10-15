import { mapState } from 'vuex'
export default {
  computed: mapState({
    jobs: state => state.queue.jobs,
    job: state => state.queue.job,
    queues: state => state.queue.queue
  }),
  // computed: {
  //   jobs: {
  //     get() { return this.$store.state.queue.jobs },
  //     set(val) {
  //       val.forEach(row => (row._showDetails = false))
  //       this.$store.dispatch('queue/set', { jobs: val })
  //     }
  //   },
  //   job: {
  //     get() { return this.$store.state.queue.job },
  //     set(val) { this.$store.dispatch('queue/set', { job: val }) }
  //   },
  //   queues: {
  //     get() { return this.$store.state.queue.queues },
  //     set(val) { this.$store.dispatch('queue/set', { queues: val }) }
  //   }
  // },
  methods: {
    async getAllJobs(queueName) {
      const jobs = await this.$axios.$get(`api/v1/redis/${queueName}/jobs`)
      await this.$store.dispatch('queue/set', { jobs })
      this.$store.dispatch('queue/set', { queueName })
    },
    async getJobById(queueName, id) {
      const jobs = await this.$axios.$get(`api/v1/redis/${queueName}/jobs/${id}`)
      await this.$store.dispatch('queue/set', { jobs })
      this.$store.dispatch('queue/set', { queueName })
    },
    async getJobsByState(queueName, status) {
      const jobs = await this.$axios.$get(`api/v1/redis/${queueName}/${status}`)
      await this.$store.dispatch('queue/set', { jobs })
      this.$store.dispatch('queue/set', { queueName })
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
