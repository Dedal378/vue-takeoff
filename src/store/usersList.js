export default {
  state: {
    usersList: null,
    model: '',
  },
  mutations: {
    SET_USERS_LIST (state, payload) {
      state.usersList = payload;
    },
    ADD_USERS_LIST (state, payload) {
      state.usersList.push(payload);
    },
    SET_DELETE_USER (state, payload) {
      state.usersList.splice(payload, 1)
    },
  },
  actions: {
    async fetchUsersList ({ commit }) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        commit('SET_USERS_LIST', data)
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', error.message)
        throw error
      }
    },
    async addUserInList ({ commit }, payload) {
      commit('CLEAR_ERROR');
      try {
        await commit('ADD_USERS_LIST', payload)
      } catch (error) {
        commit('SET_ERROR', error.message);
        throw error
      }
    },
    setDeleteUser ({ commit }, payload) {
      commit('SET_DELETE_USER', payload)
    },
  },
  getters: {
    usersList: state => state.usersList,
  },
}
