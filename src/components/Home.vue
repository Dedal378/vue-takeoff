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
            <div>This is test page</div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
            v-for="ad of ads"
            :key="ad.id"
            :src="ad.imageSrc"
            mb-7
        >
          <v-card
              class="mx-auto"
              max-width="400"
          >
            <v-img
                class="white--text align-end"
                height="200px"
                :src="ad.imageSrc"
            >
              <v-card-title primary-title />
            </v-img>

            <v-card-text class="text--primary">
              <div>{{ad.title}}</div>
              <div>{{ad.description}}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn text :to="'/ad/'+ ad.id" class="mr-3">Open</v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-container>

  </v-main>

  <v-content v-else>
    <v-container>
      <v-row>
        <v-col class="text-sm-center pt-12">
          <v-progress-circular
              indeterminate
              :rotate="50"
              :size="100"
              :value="100"
              :width="10"
              color="light-blue"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </v-content>

</template>

<script>
  export default {
    computed: {
      promoAds () {
        return this.$store.getters.promoAds;
      },
      ads () {
        return this.$store.getters.ads;
      },
      loading () {
        return this.$store.getters.loading
      }
    },
  }
</script>

<style scoped>

</style>
