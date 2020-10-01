<template>
  <b-card
    header-class="d-flex"
  >
    <template v-slot:header>
      <b-form-input />
      <b-pagination />
    </template>
    <b-table
      :items="items"
      responsive
    />
  </b-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
