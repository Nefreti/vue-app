<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="white" v-bind="attrs" v-on="on">
          More...
          </v-btn>
        </template>
<v-card>
  <v-card-title>Film details</v-card-title>
  <v-card-title>{{itemForAction.title}}</v-card-title>
  <v-card-subtitle>{{itemForAction.opening_crawl}}</v-card-subtitle>

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
