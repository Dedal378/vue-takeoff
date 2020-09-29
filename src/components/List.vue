<template>
  <v-main>
    <v-container fluid>
      <v-row
          align-content="center"
          justify="center">
        <v-col sm="10" md="8" lg="7">
          <h1 class="text--secondary mb-3">Users List</h1>
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
  computed: {
    ...mapGetters(['usersList', 'loading']),
  },
}
</script>

<style scoped>

</style>

