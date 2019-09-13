<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <div v-if="!isAuthenticated">
          Welcome. Use MyApp for blah.
        </div>
        <div v-if="isAuthenticated">
          <h1 class="display-2 font-weight-bold mb-3">Welcome to MyApp</h1>
          <div>Main Page</div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isAuthenticated() {
      try {
        return this.$store.state.auth.isAuthenticated;
      } catch {
        return false;
      }
    }
  },
  methods: {}
};
</script>
