<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 light-blue--text text--accent-2">Sign in to Star Wars App</h1>
                    <h4 class="text-center mt-4">Ensure using user name provided for registration</h4>
                  </v-card-text>
                  <v-form @submit.prevent="login">
                    <v-card-text>
                      <v-text-field prepend-icon="mdi-account" label="User Name" value="john@starwars.com"
                                    v-model="email"></v-text-field>
                      <span class="text-caption grey--text text--darken-1">This is the user name you use to login to your Star Wars app account</span>
                    </v-card-text>
                    <v-card-text>
                      <v-text-field prepend-icon="mdi-lock" label="Password" type="password"
                                    v-model="password"></v-text-field>
                      <span
                          class="text-caption grey--text text--darken-1">Please enter a password for your account</span>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="light-blue--text text--accent-2" depressed text type="submit">
                        Login
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-col>
                <v-col cols="12" md="4" class="light-blue accent-2">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Hello, Friend!</h1>
                    <h5 class="text-center">Don't have account yet? Register and enjoy the app!</h5></v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                  </div>
                </v-col>
              </v-row>

            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="light-blue accent-2">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Welcome Back!</h1>
                    <h5 class="text-center">Login and enjoy the app or register!</h5></v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                  </div>
                </v-col>
                <v-col ref="registeringForm" cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 light-blue--text text--accent-2">Sign up to Star Wars App</h1>
                    <h4 class="text-center mt-4">Please provide user name for registration</h4>
                  </v-card-text>
                  <v-form @submit.prevent="register">
                    <v-card-text>
                      <v-text-field prepend-icon="mdi-account" label="User Name" value="john@vuetifyjs.com"
                                    v-model="email"></v-text-field>
                      <span class="text-caption grey--text text--darken-1">This is the user name you will use to login to Star Wars App</span>
                    </v-card-text>
                    <v-card-text>
                      <v-text-field prepend-icon="mdi-lock" label="Password" type="password"
                                    v-model="password"></v-text-field>
                      <span class="text-caption grey--text text--darken-1">Please enter a password</span>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="light-blue--text text--accent-2" depressed text type="submit">
                        Register
                      </v-btn>
                    </v-card-actions>
                    <v-alert v-model="error">{{error.message}}</v-alert>
                  </v-form>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <Loader v-if="loader"/>
  </v-container>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Loader from "@/components/Loader";
import {checkCookie, setCookie} from "@/cookie/cookie-handler";

export default {
  name: "Login",
  components: {Loader},
  data: () => ({
    email: '',
    password: '',
    error: '',
    step: 1,
    loader: false
  }),
  methods: {
    // User gets individual cookie which is valid for 2 days.
    // This can be re-implemented with  Firebase Auth server-side session cookie management.
    // For the sake of time I chose creating my own cookie-handler.

    async login() {
      try {
        let userName = this.email + '@domain.com'
        let password = this.password
        await firebase.auth().signInWithEmailAndPassword(userName, password)
        if (!checkCookie("loginCookie")) {
          setCookie("loginCookie", "val.user.email", 2);
        }
        this.$router.replace({name: "Home"})
      } catch (error) {
        if (checkCookie("loginCookie")) {
          setCookie("loginCookie", "val.user.email", 0);
        }
        alert(error.message)
      }
    },
    async register() {
      try {
        let userName = this.email + '@domain.com'
        let password = this.password
        await firebase.auth().createUserWithEmailAndPassword(userName, password)
        this.$router.replace({name: "Home"})
      } catch (error) {
        alert(error.message)
        console.log(error)
      }
    }
  }

}
</script>

<style scoped>

</style>
