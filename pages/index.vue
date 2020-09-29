<template>
  <div class="centered">
    <transition name="slide-fade" appear>
      <octopus :size="`5em`" />
    </transition>
  </div>
</template>

<script>
import Octopus from '~/components/icons/octopus'
export default {
  components: {
    Octopus
  }
}
</script>

<style lang="scss">
.centered {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
