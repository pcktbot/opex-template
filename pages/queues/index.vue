<template>
  <div>
    <top-nav>
      <template v-slot:content>
        <b-btn
          style="align-items: center;"
          @click="pauseAllQueues()"
        >
          {{ allQueuesPaused ? 'Resume all Queues' : 'Pause all Queues' }}
        </b-btn>
      </template>
    </top-nav>
    <div class="main">
      <b-container fluid class="px-3 scroll-container">
        <b-row class="my-3">
          <b-col
            v-for="(queue, i) in queues"
            :key="i"
            cols="4"
          >
            <b-card
              header-class="d-flex justify-content-between align-items-center py-0 flex-wrap"
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
                    @click="pauseQueue(queue.name)"
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
        <b-row no-gutters>
          <b-col>
            <redis-table />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import TopNav from '~/components/top-nav'
import RedisMixin from '~/mixins/redis'
import RedisTable from '~/components/redis-table'
export default {
  components: { RedisTable, TopNav },
  mixins: [RedisMixin],
  async fetch({ store }) {
    try {
      await store.dispatch('queue/init')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    position: fixed;
    top:5rem;
    left: 0;
    right: 0;
    bottom: 30px;
  }

  .scroll-container {
    overflow-y: scroll;
    height: 100%;
    scroll-behavior: smooth
  }
</style>
