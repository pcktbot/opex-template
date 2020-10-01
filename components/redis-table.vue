<template>
  <b-card
    header-class="d-flex align-items-center justify-content-between"
  >
    <template v-slot:header>
      <b-col cols="4">
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
      <b-col cols="4">
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
    </template>
    <b-table
      :items="items"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      responsive
    />
  </b-card>
</template>

<script>
export default {
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
      totalRows: 1
    }
  },
  mounted() {
    this.totalRows = this.items.length
  },
  watch: {
    items: {
      handler(val) {
        this.totalRows = val.length
      }
    }
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
