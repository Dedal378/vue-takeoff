import * as fb from 'firebase';

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data;
    }
  },
  actions: {
    async registerUser ({ commit }, { email, password }) {
      commit('CLEAR_ERROR');
      commit('SET_LOADING', true);
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password);
        commit('SET_USER', new User(user.user.uid));
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false);
        commit('SET_ERROR', error.message);
        throw error
      }
    },
    async loginUser ({ commit }, { email, password }) {
      commit('CLEAR_ERROR');
      commit('SET_LOADING', true);
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password);
        commit('SET_USER', new User(user.user.uid));
        commit('SET_LOADING', false)
      } catch (error) {
        commit('SET_LOADING', false);
        commit('SET_ERROR', error.message);
        throw error
      }
    },
    autoLoginUser ({ commit }, data) {
      commit('SET_USER', new User(data.uid))
    },
    logoutUser ({ commit }) {
      fb.auth().signOut();
      commit('SET_USER', null)
    }
  },
  getters: {
    user (state) {
      return state.user;
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
