<template>
  <v-main v-if="!loading">
    <v-container fluid class="pt-0">
      <v-row>
        <v-carousel
            height="400px"
            cycle
            progress
            hide-delimiters
            :interval="5000"
            show-arrows-on-hover
        >
          <v-carousel-item
              v-for="ad in promoAds"
              :key="ad.id"
              :src="ad.imageSrc"
              transition="scroll-x-reverse-transition"
          >
            <div class="car-link">
              <v-btn class="warning" :to="'/ad/' + ad.id">
                {{ad.title}}
              </v-btn>
            </div>
          </v-carousel-item>
        </v-carousel>
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
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(25, 118, 210, 0.5);
    transform: translate(-50%, 70%);
    padding: 5px 15px;
    border-radius: 5px;
  }
</style>
