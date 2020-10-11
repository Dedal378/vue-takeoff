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
          :elevation="7"
          class="pa-12 ma-10"
      >
        <v-list three-line>
          <template
              v-for="userList of filteredUsersList"
          >
            <v-list-item
                :key="userList.id"
                class="pa-6 ma-3 elevation-5"
            >
              <v-list-item-content
              >
                <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
                  <v-list-item-title class="font-weight-bold text-h4 mt-16 py-12" v-html="userList.name"></v-list-item-title>
                  <v-list-item-subtitle class="font-weight-medium mb-2" v-html="userList.email"></v-list-item-subtitle>
                <!--                <v-list-item-content>
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
                                </v-list-item-content>-->
                </v-parallax>
                <v-col>
                  <v-btn
                      tile
                      color="success"
                      class="mr-3"
                      @click="editUser"
                  >
                    <v-icon left>
                      mdi-pencil
                    </v-icon>
                    Edit
                  </v-btn>

                  <v-btn
                      tile
                      color="warning"
                      class="mr-3"
                      @click="saveUser"
                  >
                    <v-icon left>
                      mdi-file-check-outline
                    </v-icon>
                    Save
                  </v-btn>

                  <v-btn
                      tile
                      color="error"
                      @click="deleteUser()"
                  >
                    <v-icon left>
                      mdi-delete-off-outline
                    </v-icon>
                    Delete
                  </v-btn>

                </v-col>
                <!--<v-col
                    class="mt-5"
                >
                  <v-text-field
                      v-if="showEditInput"
                      v-model="firstname"
                      :rules="nameRules"
                      label="Firstname"
                      solo-inverted
                      required
                  ></v-text-field>
                  <v-text-field
                      v-if="showEditInput"
                      v-model="lastname"
                      :rules="nameRules"
                      label="Lastname"
                      solo-inverted
                      required
                  ></v-text-field>
                  <v-text-field
                      v-if="showEditInput"
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      solo-inverted
                      required
                  ></v-text-field>
                </v-col>-->
                <v-divider
                    inset
                    class="ma-6"
                ></v-divider>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
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
          name: `${ this.firstname }  ${ this.lastname }`,
          email: this.email,
        };
        this.addUserInList(addUser)

        this.firstname = ''
        this.lastname = ''
        this.email = ''
      }
    },
    editUser () {
      this.showEditInput = !this.showEditInput

    },
    saveUser () {

    },
    deleteUser () {
      this.setDeleteUser()
    },
  },
  computed: {
    ...mapGetters(['usersList']),
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

<style scoped lang="scss">
.v-list-item__title {
  flex: auto;
  align-self: start;
}
</style>

