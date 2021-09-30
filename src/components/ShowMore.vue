<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="white" v-bind="attrs" v-on="on">
          More...
          </v-btn>
        </template>
<v-card class="pa-5">
  <v-card-title>Film details</v-card-title>
  <v-card-title>Title: {{itemForAction.title}}</v-card-title>
  <v-card-subtitle>{{itemForAction.opening_crawl}}</v-card-subtitle>
  <v-list-item three-line>
    <v-list-item-content>
      <v-list-item-title>  Director: {{itemForAction.director}}</v-list-item-title>
      <v-list-item-title>  Producer: {{itemForAction.producer}}</v-list-item-title>
      <v-list-item-subtitle>   Release date: {{itemForAction.release_date}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
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
