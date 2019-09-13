<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MyApp</span>
        <span class="font-weight-light">ONE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isAuthenticated">
        <v-btn @click="logout">Logout ({{ username }})</v-btn>
      </div>
      <div v-if="!isAuthenticated">
        <v-btn @click="login" color="green lighten-1">Login</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <div id="nav" v-if="isAuthenticated">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      authenticated: false
    };
  },
  async mounted() {
    await this.checkAuth();
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: "checkAuth"
  },
  computed: {
    isAuthenticated() {
      try {
        return this.$store.state.auth.isAuthenticated;
      } catch {
        return false;
      }
    },
    username() {
      return this.$store.state.auth.claims.name;
    }
  },
  methods: {
    login() {
      this.$auth.loginRedirect("/");
    },
    async logout() {
      await this.$auth.logout();
      this.$store.commit("logout");

      // Navigate back to home
      this.$router.push({ path: "/" });
    },
    async checkAuth() {
      this.authenticated = await this.$auth.isAuthenticated();
      console.log(`IsAuthenticated(): Checked => ${this.authenticated}`);
      if (this.authenticated) {
        this.$store.commit("login", {
          claims: await this.$auth.getUser(),
          accessToken: await this.$auth.getAccessToken()
        });
      } else {
        this.$store.commit("logout");
      }
    }
  }
};
</script>
