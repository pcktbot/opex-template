<template>
  <div>
    <template v-if="needsCheckIcon === true">
      <b-img :width="iconConfig.width" :height="iconConfig.height" :src="iconConfig.true" />
    </template>
    <template v-else>
      <b-img :width="iconConfig.width" :height="iconConfig.height" :src="iconConfig.false" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    needsCheckIcon: {
      type: Boolean,
      default() {
        return false
      }
    },
    iconConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>

</style>
