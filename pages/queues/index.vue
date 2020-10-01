<template>
  <b-container fluid class="px-3">
    <b-row class="my-3">
      <b-col>
        <b-card-group deck>
          <b-card
            v-for="(queue, i) in queues"
            :key="i"
            header-class="d-flex justify-content-between align-items-center py-0"
            no-body
          >
            <template v-slot:header>
              <h2 class="text-uppercase mb-0 mr-1 d-flex align-items-start">
                <span class="small text-muted" style="font-size: 0.5em;">
                  Queue Name
                </span>
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
                  {{queue.isPaused ? 'Resume' : 'Pause' }} Queue
                </b-btn>
              </b-btn-group>
            </template>
            <b-list-group>
              <b-list-group-item
                v-for="(status, key) in queue.statuses"
                :key="key"
                button
                class="d-flex justify-content-between align-items-center"
                @click="getJobsByStatus(queue.name, key)"
              >
                {{ key }}
                <b-badge
                  :variant="status === 0 ? 'muted' : 'primary'"
                  style="font-size: 1.2em;"
                >
                  {{ status }}
                </b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
    <b-row>
      <redis-table :items="jobs" />
    </b-row>
  </b-container>
</template>

<script>
import RedisMixin from '~/mixins/redis'
import RedisTable from '~/components/redis-table'
export default {
  components: { RedisTable },
  mixins: [RedisMixin],
  async asyncData({ $axios }) {
    const queues = {}
    await $axios.$get('api/v1/redis')
      .then(async (res) => {
        for (let i = 0; i < res.length; i++) {
          queues[res[i]] = {
            name: res[i].name,
            isPaused: false,
            statuses: await $axios.$get(`api/v1/redis/${res[i].name}`)
          }
        }
      })
    return {
      queues
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
