export const state = () => ({
  jobs: [],
  job: null,
  queues: {},
  filter: null,
  perPage: 10,
  pageOptions: [5, 10, 20, 50, 100],
  currentPage: 1,
  totalRows: 1,
  fields: [
    'selected',
    { key: 'id', sortable: true },
    { key: 'state', sortable: true },
    { key: 'name', sortable: true },
    { key: 'attemptsMade', sortable: true },
    '_progress',
    { key: 'processedOn', sortable: true },
    { key: 'finishedOn', sortable: true },
    'actions'
  ],
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
  async init({ commit }) {
    const allQueues = {}
    const res = await this.$axios.$get('api/v1/redis')
    for (let i = 0; i < res.length; i++) {
      allQueues[res[i].name] = {
        name: res[i].name,
        isPaused: res[i].isPaused,
        statuses: await this.$axios.$get(`api/v1/redis/${res[i].name}`)
      }
    }
    commit('SET', { queues: allQueues })
    const allQueuesPaused = res.every(queue => queue.isPaused)
    commit('SET', { allQueuesPaused })
  },
  set({ commit }, payload) {
    commit('SET', payload)
  },
  setByIndex({ commit }, payload) {
    commit('SET_BY_INDEX', payload)
  },
  setQueueProp({ commit }, payload) {
    commit('SET_QUEUE_PROP', payload)
  },
  toggleShowDetails({ commit, state }, index) {
    commit('TOGGLE', index)
  }
}

export const mutations = {
  SET(state, obj) {
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      state[key] = obj[key]
    })
  },
  SET_QUEUE_PROP(state, { queueName, propName, val }) {
    state.queues[queueName][propName] = val
  },
  SET_BY_INDEX(state, { i, data }) {
    state.jobs[i].data = data
  },
  TOGGLE(state, index) {
    const item = state.jobs[index]
    item._showDetails = !item._showDetails
  }
}
