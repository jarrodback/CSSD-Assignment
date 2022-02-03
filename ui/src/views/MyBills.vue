<template>
  <div class="mt-4">
    <h1 class="mb-4">My Bills</h1>
    <b-table id="bills-table" :items="filteredBills" :fields="fields" show-empty empty-text="No bills match the filter." responsive striped>
      <template #head(entrylocation)="head" id="entry-location-filter">
        {{head.label}}
        <b-input size="sm" v-model="filter.entryLocation" placeholder="Entry Location..."/>
      </template>
      <template #head(exitlocation)="head" id="exit-location-filter">
        {{ head.label }}
        <b-input size="sm" v-model="filter.exitLocation" placeholder="Exit Location..." />
      </template>
      <template #head(carregistrationnumber)="head" id="car-reg-filter">
        {{ head.label }}
        <b-input size="sm" v-model="filter.carRegistrationNumber" placeholder="Car Registration Number..." />
      </template>
      <template #cell(entrylocation)="cell">
        {{cell.item.journey.entryLocation.name }}
      </template>
      <template #cell(exitlocation)="cell">
        {{ cell.item.journey.exitLocation.name }}
      </template>
      <template #cell(carregistrationnumber)="cell">
        {{ cell.item.journey.regNumber }}
      </template>
      <template #cell(date)="cell">
        {{ formatDate(cell.item.journey.journeyDateTime) }}
      </template>
      <template #cell(cost)="cell">
        {{ formatCost(cell.item.cost) }}
      </template>
      <template #cell(actions)>
        <b-link>Pay Bill</b-link>
      </template>
    </b-table>
    <div class="d-flex justify-content-between align-items-baseline">
      <span class="input-group w-auto align-items-baseline">
        <span class="input-group-append mr-2">Per Page: </span>
        <b-form-select v-model="limit" :options="[5, 10, 15]" class="custom-select custom-select-sm"
                       @change="getBills" />
      </span>
      <b-pagination :per-page="limit" :total-rows="totalCount" v-model="offset" @input="getBills"></b-pagination>
      <span>{{ totalCount }} bills in {{ Math.ceil(totalCount / limit) }} pages</span>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue'
import api from "@/api/api";
import { formatDate, formatCost } from "@/utilities";

export default Vue.extend({
  name: 'MyBills',
  data () {
    return {
      bills: [],
      totalCount: 0,
      limit: 10,
      offset: 1,
      filter: {
        entryLocation: '',
        exitLocation: '',
        carRegistrationNumber: ''
      }
    }
  },
  computed: {
    fields() {
      return [{key: 'EntryLocation', sortable: false}, 
        {key: 'ExitLocation', sortable: false},
        {key: 'CarRegistrationNumber', sortable: false},
        {key: 'Date', sortable: true},
        {key: 'Cost', sortable: true},
        {key: 'Actions', sortable: false}]
    },
    filteredBills() {
      return this.bills.filter((bill) => 
          bill.journey.entryLocation.name.includes(this.filter.entryLocation) &&
          bill.journey.exitLocation.name.includes(this.filter.exitLocation) &&
          bill.journey.regNumber.includes(this.filter.carRegistrationNumber)
      )
    }
  },
  methods: {
    formatDate,
    formatCost,
    async getBills() {
      const data = await api.getAllBills({limit: this.limit, offset: parseInt(this.offset - 1)}) //TODO: Filter by DriverId
      this.bills = data.bills
      this.totalCount = data.count
    }
  },
  async created() {
    await this.getBills()
  }
})
</script>