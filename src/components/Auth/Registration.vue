<template>
  <v-main>
    <v-container fluid>
      <v-row
          align="center"
          justify="center"
      >
        <v-col
            cols="12"
            sm="8"
            md="6"
        >
          <v-card class="elevation-3">
            <v-toolbar
                color="primary"
                dark
                flat
            >
              <v-toolbar-title>Registration</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                  lazy-validation
                  ref="form"
                  v-model="valid"
              >
                <v-text-field
                    :rules="emailRules"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    v-model="email"
                />

                <v-text-field
                    :counter="6"
                    :rules="passwordRules"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                />

                <v-text-field
                    :counter="6"
                    :rules="confirmPasswordRules"
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirm-password"
                    prepend-icon="lock"
                    type="password"
                    v-model="confirmPassword"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                  color="primary"
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
              >
                Create account
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>


</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
        ],
        confirmPassword: '',
        confirmPasswordRules: [
          v => !!v || 'Password is required',
          v => v === this.password || 'Password should match',
        ],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password ,
          };

          this.$store.dispatch('registerUser', user)
            .then(() => {
              this.$router.push('/list')
            })
            .catch(() => {})
        }
      },
    },
    props: {
      source: String,
    },
  }
</script>
