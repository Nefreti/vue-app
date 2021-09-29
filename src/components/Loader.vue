<template>
  <v-overlay>
    <div class="text-center">
      <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>
      </v-overlay>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>

</style>
