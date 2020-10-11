<template>
  <v-main>
    <v-container fluid>
      <v-row
          align-content="center"
          justify="center"
      >
        <v-col sm="10" md="8" lg="7">
          <h2 class="text--secondary mb-3">Find users in list</h2>

          <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search users..."
          ></v-text-field>

          <!--          <v-card>
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
                                label="Select items for search..."
                                multiple
                                outlined
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>-->
        </v-col>
      </v-row>

      <v-divider
          class="mt-12"
      />
      <v-form
          ref="formAddUser"
          v-model="valid"
          lazy-validation
      >
        <v-container>
          <v-col>
            <h2 class="text--secondary">Add new user</h2>
          </v-col>
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="0"
                  label="First name"
                  solo-inverted
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
                  :counter="0"
                  label="Last name"
                  solo-inverted
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
                  solo-inverted
                  required
              ></v-text-field>
            </v-col>

            <v-col
                class="d-flex justify-end"
            >
              <v-btn
                  x-large
                  @click="submit"
              >
                submit
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card
          v-for="userList of filteredUsersList"
          :key="userList.id"
          :elevation="7"
          class="pa-12 ma-10"
      >
        <v-parallax
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle class="font-weight-bold text-h5 mb-2">id: {{ userList.id }}</v-list-item-subtitle>
              <v-list-item-title class="font-weight-bold text-h4" v-html="userList.name"></v-list-item-title>
              <v-list-item-subtitle class="font-weight-medium mb-2" v-html="userList.email"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium mb-2">Address</v-list-item-title>
              <v-list-item-subtitle v-html="userList.address.zipcode"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="userList.address.city"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="userList.address.street"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="userList.address.suite"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium mb-2">Geo</v-list-item-title>
              <v-list-item-subtitle v-html="userList.address.geo.lat"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="userList.address.geo.lng"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium mb-2">Phone</v-list-item-title>
              <v-list-item-subtitle v-html="userList.phone"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium mb-2">Website</v-list-item-title>
              <v-list-item-subtitle>
                <a href="#" target="_blank">{{ userList.website }}</a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium mb-2">Company</v-list-item-title>
              <v-list-item-subtitle v-html="userList.company.name"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="userList.company.catchPhrase"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="userList.company.bs"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-parallax>
        <v-col>
          <Edit
              :user="userById"
          ></Edit>

          <v-btn
              tile
              color="error"
              @click="deleteUser"
          >
            <v-icon left>
              mdi-delete-off-outline
            </v-icon>
            Delete
          </v-btn>
        </v-col>

        <v-col
            v-if="showEditInput"
            class="mt-5"
        >
          <v-text-field
              v-model="firstname"
              :rules="nameRules"
              label="Firstname"
              solo-inverted
              required
          ></v-text-field>
          <v-text-field
              v-model="lastname"
              :rules="nameRules"
              label="Lastname"
              solo-inverted
              required
          ></v-text-field>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              solo-inverted
              required
          ></v-text-field>
        </v-col>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>

import Edit from "@/components/Edit";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Edit },
  props: ['id'],
  data () {
    return {
      filter: '',
      items: [],
      value: [],
      valid: false,
      firstname: '',
      lastname: '',
      email: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 2 || 'Name must be less than 2 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      showEditInput: false,
      search: '',
    }
  },
  methods: {
    ...mapActions(['addUserInList', 'setDeleteUser']),
    submit () {
      if (this.$refs.formAddUser.validate()) {
        const addUser = {
          id: this.usersList.length + 1,
          name: `${ this.firstname }  ${ this.lastname }`,
          email: this.email,
          address: {
            zipcode: '350000',
            city: 'Krasnodar',
            street: 'Krasnaya',
            suite: '12',
            geo: {
              lat: '123412341234',
              lng: '123412341234',
            }
          },
          phone: '+7 918 123 45 67',
          website: 'website.ru',
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        };
        this.addUserInList(addUser)

        this.firstname = ''
        this.lastname = ''
        this.email = ''
      }
    },
    deleteUser () {
      this.setDeleteUser()
    },
  },
  computed: {
    ...mapGetters(['usersList', 'userById']),
    filteredUsersList () {
      let searchToLowerCase = this.search.toLowerCase()
      return this.usersList.filter(userList => {
        return userList.name.toLowerCase().indexOf(searchToLowerCase) > -1
            || userList.email.toLowerCase().indexOf(searchToLowerCase) > -1
        // || userList.company.name.toLowerCase().indexOf(searchToLowerCase) > -1
        // || userList.address.city.toLowerCase().indexOf(searchToLowerCase) > -1
        // || userList.website.toLowerCase().indexOf(searchToLowerCase) > -1
      })
    },
    userById () {
      const id = this.id
      return this.$store.getters.userById(id)
    },
    /*    filterName () {
     return this.usersList.slice(0, 1).map((obj) => {
     for (const key in obj) {
     this.items.push(key)
     }
     })
     },*/
    // eslint-disable-next-line vue/no-dupe-keys
    // search: {
    //   get () {
    //     return this.search
    //   },
    //   set (value) {
    //     this.$store.commit('', value)
    //   }
    // },
  },
}
</script>

<style lang="scss">
.v-list-item {
  flex: auto;

  &__title {
    color: #fff;
    text-decoration: underline;
  }
}

.v-parallax__content {
  flex-wrap: wrap;
}
</style>

