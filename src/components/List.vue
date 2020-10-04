<template>
  <v-main>
    <v-container fluid>
      <v-row
          align-content="center"
          justify="center">
        <v-col sm="10" md="8" lg="7">
          <h1 class="text--secondary mb-3">Users List</h1>

          <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search for..."
          ></v-text-field>

          <v-card>
            <v-container fluid>
              <v-row
                  align="center"
              >
                <v-col
                    cols="12"
                >
                  <v-select
                      v-model="value"
                      :items="items"
                      :filter="filterName"
                      chips
                      label="select items for search"
                      multiple
                      outlined
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="10"
                  label="First name"
                  required
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  label="Last name"
                  required
              ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
              ></v-text-field>

              <v-btn
                  class="mr-4"
                  @click="submit"
              >
                submit
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card
          :elevation="7"
          class="pa-12 ma-6"
      >
        <v-list three-line>
          <template
              v-for="(userList) of filteredUsersList"
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
  data () {
    return {
      search: '',
      filter: '',
      items: [],
      value: [],
      valid: false,
      firstname: '',
      lastname: '',
      email: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    submit () {

    },
    clear () {
      this.firstname = ''
      this.lastname = ''
      this.email = ''
    },
  },
  computed: {
    ...mapGetters(['usersList', 'filteredUsersList']),
    filteredUsersList () {
      let searchToLowerCase = this.search.toLowerCase()
      return this.$store.getters.usersList.filter(userList => {
        return userList.name.toLowerCase().indexOf(searchToLowerCase) > -1
            || userList.email.toLowerCase().indexOf(searchToLowerCase) > -1
            || userList.company.name.toLowerCase().indexOf(searchToLowerCase) > -1
            || userList.address.city.toLowerCase().indexOf(searchToLowerCase) > -1
            || userList.website.toLowerCase().indexOf(searchToLowerCase) > -1
      })
    },
    filterName () {
      return this.usersList.slice(0, 1).map((obj) => {
        for (const key in obj) {
          this.items.push(key)
        }
      })
    }
  },
}
</script>

<style scoped>

</style>

