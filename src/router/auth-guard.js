import store from '../store';

export default function (to, from, next) {
  store.getters.isUserLoggedIn ? next() : next('/login?loginError=true');
}
