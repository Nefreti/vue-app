<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-small outlined color="red" v-bind="attrs" v-on="on">
        More...
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="light-blue accent-2">
        <v-toolbar-title>Film details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title> {{ itemForAction.title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-title class="my-2">Opening crawl:</v-card-title>
      <v-card-subtitle>{{ itemForAction.opening_crawl }}</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text class="mt-3">Director: {{ itemForAction.director }}</v-card-text>
      <v-card-subtitle>Producer: {{ itemForAction.producer }}</v-card-subtitle>
      <v-card-subtitle>Release date: {{ itemForAction.release_date }}</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" text color="light-blue accent-2">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "showMore",
  props: {
    itemForAction: {
      required: true,
      default: null
    }
  },
  data: () => ({
    dialog: false,

  }),


}
</script>

<style scoped>

</style>
