<template>
  <div class="mt-4">
    <h1 class="mb-4">My Bills</h1>
    <b-table :items="bills" :fields="fields" responsive striped>
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
      bills: []
    }
  },
  computed: {
    fields() {
      return ['EntryLocation', 'ExitLocation', 'CarRegistrationNumber', 'Date', 'Cost', 'Actions']
    }
  },
  methods: {
    formatDate,
    formatCost
  },
  async created() {
    this.bills = await api.getAllBills({}) //TODO: Filter by DriverId
  }
})
</script>