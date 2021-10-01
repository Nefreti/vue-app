<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-row class="light-blue accent-2">
            <v-card-title class="white--text mt-5">Welcome to Star Wars App!</v-card-title>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card-text>You have been successfully logged in to our application.
                Navigate to main page to explore interesting facts about Star Wars movies,
                legendary characters and many many more...
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="light-blue--text text--accent-2" depressed text>
                  <router-link to="/secret">EXPLORE</router-link>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Home"
}
</script>

<style scoped>
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
  color: midnightblue !important;
}

.v-application a {
  color: midnightblue !important;
  text-decoration: none;
}
</style>
