<template>
    <div class="mt-4">
        <b-button
            v-if="!isDriver"
            variant="info"
            v-on:click="goBack()"
        >Back</b-button>
        <h1 class="mb-4">{{pageName}}</h1>
        <b-form-group>
            <b-form-radio-group
                buttons
                button-variant="outline-primary"
                v-model="page"
                :options="pages"
                @change="getBills"
            />
        </b-form-group>
        <b-table
            id="bills-table"
            :items="filteredBills"
            :fields="fields"
            show-empty
            empty-text="No bills match the filter."
            responsive
            striped
        >
            <template #head(entrylocation)="head">
                {{head.label}}
                <b-input
                    size="sm"
                    v-model="filter.entryLocation"
                    placeholder="Entry Location..."
                    id="entry-location-filter"
                />
            </template>
            <template #head(exitlocation)="head">
                {{ head.label }}
                <b-input
                    size="sm"
                    v-model="filter.exitLocation"
                    placeholder="Exit Location..."
                    id="exit-location-filter"
                />
            </template>
            <template #head(carregistrationnumber)="head">
                {{ head.label }}
                <b-input
                    size="sm"
                    v-model="filter.carRegistrationNumber"
                    placeholder="Car Registration Number..."
                    id="car-registration-filter"
                />
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
            <template
                #cell(actions)="cell"
                v-if="isDriver"
            >
                <b-link
                    :to="{ name: 'PayBill', params: { id: cell.item._id }}"
                    v-if="page !== 'Payment History'"
                >Pay Bill</b-link>
            </template>
        </b-table>
        <div class="d-flex justify-content-between align-items-baseline">
            <span class="input-group w-auto align-items-baseline">
                <span class="input-group-append mr-2">Per Page: </span>
                <b-form-select
                    v-model="limit"
                    :options="[5, 10, 15]"
                    class="custom-select custom-select-sm"
                    @change="getBills"
                />
            </span>
            <b-pagination
                :per-page="limit"
                :total-rows="totalCount"
                v-model="offset"
                @input="getBills"
            ></b-pagination>
            <span>{{ totalCount }} bills in {{ Math.ceil(totalCount / limit) }} pages</span>
        </div>
    </div>
</template>

<script lang="js">
import Vue from 'vue'
import api from "@/api/api";
import { formatDate, formatCost } from "@/utilities";
import store from "@/store/store";

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
      },
      pages: ['Unpaid Bills', 'Payment History'],
      page: '',
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
    },

    /**
     * Returns a the page name depending on which user is currently logged in.
     */
    pageName() {
      return store.getters.user.type === "Toll Operator" && this.$route.params.username ? `Displaying bills for ${this.$route.params.username}` : "My Bills";
    },

     /**
     * Returns if the user type is driver.
     */
    isDriver() {
      return store.getters.user.type === "Driver"
    }
  },

  methods: {
    formatDate, //Import the format date helper function to be used in the template.
    formatCost, //Import the format cost helper function to be used in the template.

    /**
     * Gets a list of bills from the api and sets the bills and totalcount variables.
     */
    async getBills() {
      let paid = true
      if(this.page === 'Unpaid Bills'){
        paid = false
      }
      const driverName = this.$route.params.id ?? store.getters.user.id
      const data = await api.getAllBills({driver: driverName, paid: paid, limit: this.limit, offset: parseInt(this.offset - 1)})
      this.bills = data.bills
      this.totalCount = data.count
    },

     /**
     * Redirects back to the view users page for toll operator.
     */
    goBack() {
      this.$router.push("view-users");
    }
  },

  /**
   * Gets a list of bills on create.
   */
  async created() {
    this.page = 'Unpaid Bills'
    await this.getBills()
  }
})
</script>