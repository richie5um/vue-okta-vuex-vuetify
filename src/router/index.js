import Vue from "vue";
import Router from "vue-router";
import Auth from '@okta/okta-vue';

import Home from "../views/Home.vue";

Vue.use(Router);

Vue.use(Auth, {
  issuer: 'https://xxxxxx.okta.com/oauth2/default',
  client_id: 'xxxx',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email',
});

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback(),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());
export default router;
