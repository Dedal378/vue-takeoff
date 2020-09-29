<template>
  <v-main>
    <v-container fluid>
      <v-row
          align-content="center"
          justify="center">
        <v-col sm="10" md="8" lg="7">
          <h1 class="text--secondary mb-3">Users List</h1>
          <v-autocomplete
              v-model="model"
              :items="usersList"
              :loading="isLoading"
              :search-input.sync="search"
              chips
              clearable
              hide-details
              hide-selected
              item-text="name"
              item-value="symbol"
              label="Search..."
              solo
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Search user for
                  <strong>name</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attr, on, item, selected }">
              <v-chip
                  v-bind="attr"
                  :input-value="selected"
                  color="blue-grey"
                  class="white--text"
                  v-on="on"
              >
                <v-icon left>
                  mdi-bitcoin
                </v-icon>
                <span v-text="item.name"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                  color="indigo"
                  class="headline font-weight-light white--text"
              >
                {{ item.name.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-bitcoin</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-card
          :elevation="7"
          class="pa-12 ma-6"
      >
        <v-list three-line>
          <template
              v-for="(userList) of usersList"
          >
            <v-list-item
                :key="userList.id"
            >
              <v-list-item-content
                  class="pa-6 ma-3"
              >
                <v-list-item-title class="font-weight-bold text-h4 mb-2" v-html="userList.name"></v-list-item-title>
                <v-list-item-subtitle class="font-weight-medium mb-2" v-html="userList.email"></v-list-item-subtitle>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium mb-2">Address</v-list-item-title>
                  <v-list-item-subtitle v-html="userList.address.zipcode"></v-list-item-subtitle>
                  <v-list-item-subtitle v-html="userList.address.city"></v-list-item-subtitle>
                  <v-list-item-subtitle v-html="userList.address.street"></v-list-item-subtitle>
                  <v-list-item-subtitle v-html="userList.address.suite"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium mb-2">Geo</v-list-item-title>
                  <v-list-item-subtitle v-html="userList.address.geo.lat"></v-list-item-subtitle>
                  <v-list-item-subtitle v-html="userList.address.geo.lng"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium mb-2">Phone</v-list-item-title>
                  <v-list-item-subtitle v-html="userList.phone"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium mb-2">Website</v-list-item-title>
                  <v-list-item-subtitle>
                    <a href="#" target="_blank">{{ userList.website }}</a>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-medium mb-2">Company</v-list-item-title>
                  <v-list-item-subtitle v-html="userList.company.name"></v-list-item-subtitle>
                  <v-list-item-subtitle v-html="userList.company.catchPhrase"></v-list-item-subtitle>
                  <v-list-item-subtitle v-html="userList.company.bs"></v-list-item-subtitle>
                </v-list-item-content>

                <v-divider
                    inset
                    class="mt-6"
                ></v-divider>
              </v-list-item-content>
              <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
  }),

  watch: {
    model (val) {
      if (val != null) this.tab = 0
      else this.tab = null
    },
    // eslint-disable-next-line no-unused-vars
    search (val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
    },
  },
  computed: {
    ...mapGetters(['usersList', 'loading']),
  },
}
</script>

<style scoped>

</style>

