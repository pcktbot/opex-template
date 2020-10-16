<template>
  <div class="bg-primary grid-footer footer-shadow d-flex py-1 px-4 justify-content-between">
    <div class="feedback-anchor">
      <b-btn
        link
        href="https://getg5.slack.com/archives/CR01N6NNQ"
        target="_blank"
        class="text-white bg-transparent p-0 border-0"
      >
        <slack-icon :size="`1.25em`" />
        operationalexcellence
      </b-btn>
    </div>
    <p class="mb-0 text-white">
      <span class="copyright">©</span> G5 2020
    </p>
  </div>
</template>

<script>
import SlackIcon from '~/components/icons/slack'
export default {
  components: {
    SlackIcon
  }
}
</script>

<style>
.feedback-anchor {
  position: relative;
}
.feedback-container {
  position: absolute;
  top: 0;
  right: -400px;
  width: 400px;
}

.footer-shadow {
  box-shadow: 0 0 20px RGBA(0, 0, 0, 0.2);
}
.copyright {
  margin-bottom: 0;
}
</style>
