<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="loggedId">
      <v-card-title>Star Wars App</v-card-title>
      <v-spacer></v-spacer>
      <v-list class="d-flex flex-row">
        <v-list-item v-if="!loggedId">
          <router-link to="/">Login</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/home">Home</router-link>
        </v-list-item>
        <v-list-item class="text-no-wrap">
          <router-link to="/secret">Main page</router-link>
        </v-list-item>
      </v-list>
      <TopHeader/>
    </v-app-bar>
    <v-main>
      <router-view/>
      <app-footer/>
    </v-main>
  </v-app>
</template>
<script>


import TopHeader from "@/components/Top-header";
import firebase from "firebase";
import AppFooter from "@/components/App-Footer";


export default {
  name: 'App',
  components: {AppFooter, TopHeader},
  data: () => ({
    loggedId: false,
  }), created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedId = true
      } else {
        this.loggedId = false
      }
    })
  },

};
</script>
<style scope>
a:hover {
  cursor: pointer;
  opacity: 0.5;
}

a.router-link-exact-active {
  cursor: pointer;
  opacity: 0.5;
}

.theme--dark.v-sheet {
  background-color: transparent !important;
  color: white !important;
}

.v-application a {
  color: white !important;
  text-decoration: none;
}
</style>
