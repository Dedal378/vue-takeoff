<template>
  <v-main v-if="!loading">
    <v-container fluid class="pt-0">
      <v-row>
        <v-card
            class="mt-12 mx-auto"
            max-width="600"
        >
          <v-img
              class="white--text align-end"
              height="400px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>HELLO, WORLD</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>This is home page</div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
  }
</script>

<style scoped>

</style>
