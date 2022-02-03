<template>
  <div class="mt-4">
    <h1 class="mb-4">My Bills</h1>
    <b-table id="bills-table" :items="filteredBills" :fields="fields" show-empty empty-text="No bills match the filter." responsive striped>
      <template #head(entrylocation)="head" >
        {{head.label}}
        <b-input size="sm" v-model="filter.entryLocation" placeholder="Entry Location..." id="entry-location-filter"/>
      </template>
      <template #head(exitlocation)="head" >
        {{ head.label }}
        <b-input size="sm" v-model="filter.exitLocation" placeholder="Exit Location..." id="exit-location-filter"/>
      </template>
      <template #head(carregistrationnumber)="head" >
        {{ head.label }}
        <b-input size="sm" v-model="filter.carRegistrationNumber" placeholder="Car Registration Number..." id="car-registration-filter"/>
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
  name: 'MyBills', //Sets the name of file.
  data () {
    return {
      bills: [], //Stores the list of bills from the api.
      totalCount: 0, //Stores the total count of all bills.
      limit: 10, //Stores the amount of items to be displayed in the table.
      offset: 1, //Stores the page number of the table.
      filter: {
        entryLocation: '', //Stores the entry location filter.
        exitLocation: '', //Stores the exit location filter.
        carRegistrationNumber: '' //Stores the car registration number filter.
      }
    }
  },
  computed: {
    /**
     * Returns a list of headings to be used in the table and states if they are sortable fields.
     */
    fields() {
      return [{key: 'EntryLocation', sortable: false}, 
        {key: 'ExitLocation', sortable: false},
        {key: 'CarRegistrationNumber', sortable: false},
        {key: 'Date', sortable: true},
        {key: 'Cost', sortable: true},
        {key: 'Actions', sortable: false}]
    },
    /**
     * Returns a filtered list of bills based on the text input filters.
     */
    filteredBills() {
      return this.bills.filter((bill) => 
          bill.journey.entryLocation.name.includes(this.filter.entryLocation) &&
          bill.journey.exitLocation.name.includes(this.filter.exitLocation) &&
          bill.journey.regNumber.includes(this.filter.carRegistrationNumber)
      )
    }
  },
  methods: {
    formatDate, //Import the format date helper function to be used in the template.
    formatCost, //Import the format cost helper function to be used in the template.
    /**
     * Gets a list of bills from the api and sets the bills and totalcount variables.
     */
    async getBills() {
      const data = await api.getAllBills({limit: this.limit, offset: parseInt(this.offset - 1)}) //TODO: Filter by DriverId
      this.bills = data.bills
      this.totalCount = data.count
    }
  },
  /**
   * Gets a list of bills on create.
   */
  async created() {
    await this.getBills()
  }
})
</script>