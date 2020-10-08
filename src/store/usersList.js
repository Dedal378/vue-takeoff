// import * as fb from 'firebase';
// import { stack } from "vuetify/src/components/VCalendar/modes/stack";

export default {
  state: {
    usersList: null,
    model: '',
    search: '',
  },
  mutations: {
    SET_USERS_LIST (state, payload) {
      state.usersList = payload;
    },
    ADD_USERS_LIST (state, payload) {
      state.usersList.push(payload);
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
  },
  getters: {
    usersList: state => state.usersList,
    search: state => state.search,
    filteredUsersList (state) {
      let searchToLowerCase = state.search.toLowerCase()
      return state.usersList.filter(userList => {
        return userList.name.toLowerCase().indexOf(searchToLowerCase) > -1
          || userList.email.toLowerCase().indexOf(searchToLowerCase) > -1
      })
    },
  },
}
