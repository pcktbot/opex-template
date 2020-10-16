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
            @click="onSave"
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
import RedisMixin from '~/mixins/redis'
export default {
  mixins: [RedisMixin],
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      queueName: state => state.queue.queueName,
      activeIndex: state => state.queue.activeIndex
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
          data: JSON.parse(val)
        })
      }
    }
  },
  methods: {
    onSave() {
      this.updateJobData(
        this.queueName,
        this.jobs[this.activeIndex].id,
        this.jobs[this.activeIndex].data
      )
      this.hide()
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
