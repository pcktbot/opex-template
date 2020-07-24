<template>
  <div >
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
