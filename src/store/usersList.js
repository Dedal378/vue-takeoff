// import * as fb from 'firebase';

export default {
  state: {
    usersList: []
  },
  mutations: {
    SET_USERS_LIST (state, data) {
      state.usersList = data;
    }
  },
  actions: {
    async fetchUsersList ({ commit }, getters) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        commit('SET_USERS_LIST', data)
        commit('SET_LOADING', false);
      } catch (error) {
        commit('SET_LOADING', false);
        commit('SET_ERROR', error.message);
        console.log(getters);
        throw error
      }
    },
  },
  getters: {
    doneUsersList (state) {
      return state.usersList.filter(o => o.done)
    },
    undoneUsersList (state) {
      return state.usersList.filter(o => !o.done)
    },
    usersList (state, getters) {
      return getters.undoneUsersList.concat(getters.doneUsersList)
    },
  },
}
