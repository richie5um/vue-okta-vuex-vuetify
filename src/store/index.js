import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      isAuthenticated: false,
      claims: {},
      accessToken: {}
    }
  },
  mutations: {
    login(state, auth) {
      state.auth.isAuthenticated = true;
      state.auth.claims = auth.claims;
      state.auth.accessToken = auth.accessToken;
    },
    logout(state) {
      state.auth.isAuthenticated = false;
      state.auth.claims = {};
      state.auth.accessToken = {};
    }
  },
  actions: {}
});
