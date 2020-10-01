export default {
  data() {
    return {
      jobs: [],
      job: null
    }
  },
  methods: {
    async getAllJobs(queueName) {
      this.jobs = await this.$axios.$get(`api/v1/redis/${queueName}/jobs`)
    },
    async getJobById(queueName, id) {
      this.job = await this.$axios.$get(`api/v1/redis/${queueName}/jobs/${id}`)
    },
    async getJobsByStatus(queueName, status) {
      this.jobs = await this.$axios.$get(`api/v1/redis/${queueName}/${status}`)
    },
    addJobs(queueName) {
      this.$axios.$post(`api/v1/redis/${queueName}/jobs`, {})
    },
    pauseQueue(queueName) {
      this.$axios.$put(`api/v1/redis/${queueName}`, {})
    }
  }
}
