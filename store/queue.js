export const state = () => ({
  jobs: [],
  job: null,
  queues: {},
  filter: null,
  perPage: 10,
  pageOptions: [5, 10, 20, 50, 100],
  currentPage: 1,
  totalRows: 1,
  fields: ['selected', 'id', 'state', 'name', 'attemptsMade', '_progress', 'processedOn', 'finishedOn', 'actions'],
  selectMode: 'multi',
  selected: [],
  iconConfig: {
    width: '25',
    height: '25',
    true: '/check-box.svg',
    false: '/square.svg'
  },
  queueName: null,
  activeIndex: null
})

export const actions = {
  async GET({ commit }) {
    const allQueues = {}
    const res = await this.$axios.$get('api/v1/redis')
    for (let i = 0; i < res.length; i++) {
      allQueues[res[i].name] = {
        name: res[i].name,
        isPaused: false,
        statuses: await this.$axios.$get(`api/v1/redis/${res[i].name}`)
      }
    }
    commit('SET', { queues: allQueues })
  }
}

export const mutations = {
  SET(state, obj) {
    const keys = Object.keys(obj)
    // eslint-disable-next-line no-return-assign
    keys.forEach(key => state[key] = obj[key])
  },
  ToggleShowDetails (state, index) {
    const item = state.jobs[index]
    item._showDetails = !item._showDetails
  }
}
