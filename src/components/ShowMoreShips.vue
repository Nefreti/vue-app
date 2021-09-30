<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="white" v-bind="attrs" v-on="on">
          More...
          </v-btn>
        </template>
<v-card class="pa-5">
  <v-card-title>Details</v-card-title>
  <v-card-title>Name: {{itemForAction.name}}</v-card-title>
  <v-card-subtitle>Model: {{itemForAction.model}}</v-card-subtitle>
  <v-card-text>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>  Cargo capacity: {{itemForAction.cargo_capacity}}</v-list-item-title>
        <v-list-item-title>  Cost in credits: {{itemForAction.cost_in_credits}}</v-list-item-title>
        <v-list-item-subtitle>Manufacturer: {{itemForAction.manufacturer}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
      </v-card-text>

</v-card>
      </v-dialog>
</template>

<script>
export default {
name: "showMoreShips",
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
