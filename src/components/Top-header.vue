<template>
  <div>
     <v-btn small @click="signOut" outlined class="mx-4">Sign out</v-btn>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  name: "Top-header",
  methods: {
    async signOut() {
      try {
        const data = firebase.auth().signOut()
        console.log(data)
        this.$router.replace({name: "Home"})
      } catch (error) {
        console.log(error)
      }
    }
  }


}
</script>

<style scoped>

</style>
