<template>
  <svg
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="none"
    style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
    preserveAspectRatio="xMidYMid meet"
    class="text-top"
  >
    <path :fill="color" d="M16.956 12.362a.89.89 0 0 0-1.122-.571l-.898.291c-.198-.612-.41-1.263-.61-1.875l.898-.291a.891.891 0 1 0-.55-1.695l-.898.292l-.292-.897a.89.89 0 1 0-1.693.55l.292.898l-1.875.61l-.292-.898a.89.89 0 0 0-1.694.55l.292.898l-.926.301a.89.89 0 0 0-.553 1.084c.136.472.638.76 1.103.61l.926-.302l.61 1.875l-.927.302a.891.891 0 0 0-.553 1.083c.137.473.639.762 1.103.61c.004 0 .368-.119.927-.3l.301.925a.891.891 0 0 0 1.084.553c.472-.136.761-.638.61-1.103c-.001-.003-.12-.367-.3-.926c.612-.199 1.263-.41 1.874-.61l.301.927a.891.891 0 0 0 1.084.553c.473-.137.761-.639.61-1.103l-.301-.926l.897-.292a.891.891 0 0 0 .572-1.123zm-5.588.88l-.61-1.875c.613-.198 1.264-.41 1.875-.609l.61 1.875l-1.875.61z" />
    <path :fill="color" d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z" />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '1em'
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  }
}
</script>

<style>
.text-top { vertical-align: text-top }
</style>
