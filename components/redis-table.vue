<template>
  <b-card
    header-class="d-flex align-items-center justify-content-between"
  >
    <template v-slot:header>
      <b-col cols="3">
        <b-form-group
          label="Filter"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
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
            v-model="perPage"
            size="sm"
            :options="pageOptions"
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
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          />
        </b-form-group>
      </b-col>
      <b-col cols="3" class="mt-4 pt-3">
        <b-button size="sm" @click="selectAllRows">Select all</b-button>
        <b-button size="sm" @click="clearSelected">Clear selected</b-button>
      </b-col>
    </template>
    <b-table
      ref="queueTbl"
      :items="items"
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      :select-mode="selectMode"
      selectable
      responsive
      @filtered="onFiltered"
      @row-selected="onRowSelected"
      head-variant="light"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <icons-swap
          :needsCheckIcon="rowSelected"
          :iconConfig="iconConfig"
        />
      </template>
    </b-table>
  </b-card>
</template>

<script>
import IconsSwap from '~/components/icons-swap'
export default {
  components: {
    IconsSwap
  },
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      filter: null,
      perPage: 10,
      pageOptions: [5, 10, 20, 50],
      currentPage: 1,
      totalRows: 1,
      fields: ['selected', 'id', 'state', 'name', 'attemptsMade', '_progress', 'processedOn', 'finishedOn'],
      selectMode: 'multi',
      selected: [],
      iconConfig: {
        width: '25',
        height: '25',
        true: '/check-box.svg',
        false: '/square.svg'
      }
    }
  },
  watch: {
    items: {
      handler(val) {
        this.totalRows = val.length
      }
    }
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onRowSelected(items) {
      this.selected = items
    },
    selectAllRows() {
      this.$refs.queueTbl.selectAllRows()
    },
    clearSelected() {
      this.$refs.queueTbl.clearSelected()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
