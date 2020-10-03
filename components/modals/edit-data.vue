<template>
  <b-modal
    id="edit-data"
    :hide-footer="true"
    header-bg-variant="primary"
    size="lg"
    title="Edit Data"
  >
    <b-container fluid>
      <b-row>
        <b-col>
          {{ json }}
          <!-- need to replace with v-jsoneditor -->
          <b-button
            variant="secondary"
            block
            class="text-center"
          >
            Save
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      activeIndex: state => state.queue.activeIndex,
      jobs: state => state.queue.jobs
    }),
    json: {
      get() {
        return this.activeIndex !== null
          ? this.jobs[this.activeIndex].data
          : null
      },
      set(val) {
        // needs to be written
      }
    }
  },
  methods: {
    hide() {
      console.log('hi')
      this.$bvModal.hide('edit-data')
    }
  }
}
</script>

<style lang="scss" >
  .modal-dialog {
    & .modal-title {
      color: white;
    } & .modal-header .close {
      color: white;
    }
  }
</style>
