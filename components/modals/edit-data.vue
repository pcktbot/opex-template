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
          <b-form-textarea
            v-model="json"
            rows="12"
          />
          <b-button
            variant="secondary"
            block
            class="text-center"
            @click="onUpdate"
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
          ? JSON.stringify(this.jobs[this.activeIndex].data)
          : ''
      },
      set(val) {
        this.$store.dispatch('queue/setByIndex', {
          i: this.activeIndex,
          data: val
        })
      }
    }
  },
  methods: {
    onUpdate(evt) {
      this.$emit('on-update', evt)
    },
    hide() {
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
