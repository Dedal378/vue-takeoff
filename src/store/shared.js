export default {
  state: {
    loading: false,
    error: null,
  },
  mutations: {
    SET_LOADING (state, data) {
      state.loading = data
    },
    SET_ERROR (state, data) {
      state.error = data
    },
    CLEAR_ERROR (state) {
      state.error = null
    },
  },
  actions: {
    setLoading ({commit}, data) {
      commit('SET_LOADING', data)
    },
    setError ({commit}, data) {
      commit('SET_ERROR', data)
    },
    clearError ({commit}) {
      commit('CLEAR_ERROR')
    },
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
  }
}
