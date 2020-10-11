<template>
  <v-dialog
      v-model="modal"
      max-width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn
          tile
          v-on="on"
          color="success"
          class="mr-3"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
    </template>

    <v-card>
      <v-row class="nomarginx">
        <v-col>
          <v-card-title>
            <h1 class="text--primary">
              Edit User
            </h1>
          </v-card-title>
        </v-col>
      </v-row>
      <v-divider />
      <v-row class="nomarginx">
        <v-col>
          <v-card-text>
            <v-text-field
                v-model="editedName"
                label="Name"
                name="name"
                type="text"
            />
            <v-text-field
                v-model="editedEmail"
                label="Email"
                name="email"
                type="text"
            />
          </v-card-text>
        </v-col>
      </v-row>
      <v-row class="nomarginx">
        <v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="onCancel"
                outlined>Cancel</v-btn>
            <v-btn
                @click="onSave"
                class="success">Save</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Edit',
  props: ['user'],
  data () {
    return {
      modal: false,
      editedName: this.user.name,
      editedEmail: this.user.email,
    }
  },
  methods: {
    onCancel () {
      this.editedName = this.user.name;
      this.editedEmail = this.user.email;
      this.modal = false
    },
    onSave () {
      if (this.editedName !== '' && this.editedEmail !== '') {
        this.$store.dispatch('updateAd', {
          name: this.editedName,
          email: this.editedEmail,
          id: this.user.id
        });

        this.modal = false
      }
    }
  },
}
</script>

<style scoped>
.nomarginx {
  margin-right: 0;
  margin-left: 0;
}

</style>
