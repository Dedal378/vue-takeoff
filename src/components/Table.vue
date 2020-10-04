<template>
  <v-container fluid>
    <v-data-iterator
        :items="usersList"
        :search="search"
        hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
        >
          <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search"
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Table",
  props: {
    search: String,
  },
  computed: {
    ...mapGetters(['usersList', 'filteredUsersList', 'search']),
  },
  methods: {

  },
}

</script>

<style scoped>

</style>
