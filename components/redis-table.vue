<template>
  <b-card
    header-class="d-flex align-items-center justify-content-between"
  >
    <template v-slot:header>
      <b-col cols="2">
        <b-form-group
          label="Filter"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              :value="queueData.filter"
              @input="setQueueData({'filter': $event})"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button :disabled="!queueData.filter" @click="setQueueData({'filter': ''})">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="2">
        <b-form-group
          label="Per page"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            id="perPageSelect"
            :value="queueData.perPage"
            @change="setQueueData({'perPage': $event})"
            size="sm"
            :options="queueData.pageOptions"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-form-group
          label="Pick a page"
          label-size="sm"
          label-for="pagination"
          class="mb-0"
        >
          <b-pagination
            id="pagination"
            :value="queueData.currentPage"
            @change="setQueueData({'currentPage': $event})"
            :total-rows="queueData.totalRows"
            :per-page="queueData.perPage"
            align="fill"
            size="sm"
            class="my-0"
          />
        </b-form-group>
      </b-col>
      <b-col cols="4" class="mt-4 pt-3 text-right">
        <b-button class="mb-1" size="sm" @click="selectAllRows">Select All</b-button>
        <b-button class="mb-1" size="sm" @click="clearSelected">Clear Selected</b-button>
        <span :id="!failedSelected ? 'failed-state' : 'retry-btn'">
          <b-button
            size="sm"
            :disabled="!failedSelected"
            @click="retryFailed(queueData.queueName, queueData.selected)"
            class="mb-1"
          >
            Retry Selected Failed Jobs
          </b-button>
          <b-tooltip
            target="failed-state"
            triggers="hover"
            placement="top"
            variant="danger"
          >
            Select failed job/s<br>Or<br>Unselect jobs that are not failed
          </b-tooltip>
        </span>
      </b-col>
    </template>
    <edit-data />
    <b-table
      ref="queueTbl"
      id="queueTbl"
      :items="jobs"
      :fields="queueData.fields"
      :filter="queueData.filter"
      :per-page="queueData.perPage"
      :current-page="queueData.currentPage"
      :select-mode="queueData.selectMode"
      selectable
      responsive
      @filtered="onFiltered"
      @row-selected="onRowSelected"
      head-variant="light"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <icons-swap
          :needsCheckIcon="rowSelected"
          :iconConfig="queueData.iconConfig"
        />
      </template>
      <template v-slot:cell(_progress)="data">
        {{ `${data.value} %` }}
      </template>
      <template v-slot:cell(processedOn)="data">
        {{ processTime(data.value) }}
      </template>
      <template v-slot:cell(finishedOn)="data">
        {{ processTime(data.value) }}
      </template>
      <template v-slot:cell(actions)="row">
        <b-btn-group class="w-100 d-flex">
          <b-button variant="outline-secondary" size="sm" @click="toggleDetails(row.index)" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
          <b-button
            v-b-modal.edit-data
            variant="outline-secondary"
            size="sm"
            class="mr-2"
            @click="setQueueData({'activeIndex': row.index})"
          >
            Edit Data
          </b-button>
        </b-btn-group>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col cols="1"><b>Data:</b></b-col>
            <b-col cols="11" class="text-sm-left">{{ row.item.data }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="1"><b>Stacktrace:</b></b-col>
            <b-col cols="11" class="text-sm-left">{{ row.item.stacktrace }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="1"><b>Opts:</b></b-col>
            <b-col cols="11" class="text-sm-left">{{ row.item.opts }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="1"><b>Delay:</b></b-col>
            <b-col cols="5" class="text-sm-left">{{ row.item.delay }}</b-col>
            <b-col cols="1"><b>Return Val:</b></b-col>
            <b-col cols="5" class="text-sm-left">{{ row.item.returnvalue }}</b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RedisMixin from '~/mixins/redis'
import IconsSwap from '~/components/icons-swap'
import EditData from '~/components/modals/edit-data'
export default {
  mixins: [RedisMixin],
  components: {
    EditData,
    IconsSwap
  },
  props: {},
  data () {
    return {}
  },
  created() {
    this.setQueueData({ totalRows: this.jobs.length })
  },
  computed: {
    ...mapState({
      queueData: state => state.queue
    }),
    totalRows: {
      get() { return this.$store.state.queue.totalRows },
      set(val) { this.$store.commit('queue/SET', { totalRows: val }) }
    },
    failedSelected() {
      return this.queueData.selected.length > 0
        ? this.queueData.selected.every(row => row.state === 'failed')
        : false
    }
  },
  methods: {
    ...mapMutations({
      setQueueData: 'queue/SET',
      toggleDetails: 'queue/ToggleShowDetails'
    }),
    processTime(val) {
      return new Date(val).toLocaleString()
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.setQueueData({ currentPage: 1 })
    },
    onRowSelected(items) {
      this.setQueueData({ selected: items })
    },
    selectAllRows() {
      this.$refs.queueTbl.selectAllRows()
    },
    clearSelected() {
      this.$refs.queueTbl.clearSelected()
    }
  },
  watch: {
    jobs(val) {
      this.totalRows = val.length
    }
  }
}
</script>

<style lang="scss" >
  #queueTbl .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td {
    background-color: white;
  }
</style>
