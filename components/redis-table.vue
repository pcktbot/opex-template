<template>
  <b-card
    header-class="d-flex align-items-center justify-content-between"
  >
    <template v-slot:header>
      <b-form-input
        size="sm"
      />
      <b-pagination
        size="sm"
        class="mb-0"
      />
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
