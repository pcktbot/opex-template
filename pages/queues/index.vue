<template>
  <b-container fluid class="px-3">
    <b-row class="my-3">
      <b-col
        v-for="(queue, i) in queues"
        :key="i"
        cols="4"
      >
        <b-card
          header-class="d-flex justify-content-between align-items-center py-0"
          no-body
        >
          <template v-slot:header>
            <h2 class="d-flex text-uppercase mb-0">
              {{ queue.name }}
            </h2>
            <b-btn-group size="sm">
              <b-btn
                variant="outline-primary"
                @click="getAllJobs(queue.name)"
              >
                Get all Jobs
              </b-btn>
              <b-btn
                variant="outline-primary"
              >
                <b-icon v-if="queue.isPaused" icon="play-fill" />
                <b-icon v-else icon="pause-fill" />
              </b-btn>
            </b-btn-group>
          </template>
          <b-list-group>
            <b-list-group-item
              v-for="(status, key) in queue.statuses"
              :key="key"
              button
              class="d-flex justify-content-between align-items-center"
              @click="getJobsByState(queue.name, key)"
            >
              {{ key }}
              <b-badge
                :variant="status === 0 ? 'muted' : 'primary'"
                pill
                style="font-size: 1.2em;"
              >
                {{ status }}
              </b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <redis-table />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RedisMixin from '~/mixins/redis'
import RedisTable from '~/components/redis-table'
export default {
  components: { RedisTable },
  mixins: [RedisMixin],
  async fetch({ store }) {
    try {
      await store.dispatch('queue/GET')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>

</style>
