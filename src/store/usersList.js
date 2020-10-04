// import * as fb from 'firebase';

// import { stack } from "vuetify/src/components/VCalendar/modes/stack";

export default {
  state: {
    usersList: [],
    model: '',
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
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false)
        commit('SET_ERROR', error.message)
        console.log(getters)
        throw error
      }
    },
  },
  addUserInList ({ commit }, getters) {
    commit('CLEAR_ERROR');

    commit('SET_USERS_LIST', data)
  },
  getters: {
    usersList: state => state.usersList,
    model: state => state.model,
    filteredUsersList (state, getters) {
      // eslint-disable-next-line no-unused-vars
      let searchToLowerCase = getters => getters.model.toLowerCase()
      return state.usersList.filter(userList => {
        return userList.name.toLowerCase().indexOf(getters.model) > -1
          || userList.email.toLowerCase().indexOf(getters.model) > -1
          || userList.website.toLowerCase().indexOf(getters.model) > -1
      })
    },
  },
}
