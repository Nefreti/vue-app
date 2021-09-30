<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-small outlined color="red" v-bind="attrs" v-on="on">
        More...
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="light-blue accent-2">
        <v-toolbar-title>Starship details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title> {{ itemForAction.name }}</v-toolbar-title>
      </v-toolbar>
      <v-card-title class="my-2">Model:</v-card-title>
      <v-card-subtitle>{{ itemForAction.model }}</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-subtitle> Cargo capacity: {{ itemForAction.cargo_capacity }}</v-list-item-subtitle>
            <v-list-item-subtitle> Cost in credits: {{ itemForAction.cost_in_credits }}</v-list-item-subtitle>
            <v-list-item-subtitle>Manufacturer: {{ itemForAction.manufacturer }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
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
