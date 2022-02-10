<template>
    <div class="mt-4">
        <h1 class="mb-4">View Users</h1>
        <b-table
            id="users-table"
            :items="filteredUsers"
            :fields="fields"
            show-empty
            empty-text="No users match the filter."
            responsive
            striped
        >
            <template #head(username)="head">
                {{head.label}}
                <b-input
                    size="sm"
                    v-model="filter.username"
                    placeholder="Username"
                    id="username-filter"
                />
            </template>
            <template #head(email)="head">
                {{ head.label }}
                <b-input
                    size="sm"
                    v-model="filter.email"
                    placeholder="Email"
                    id="email-filter"
                />
            </template>
            <template #cell(actions)="cell">
                <b-link :to="{ name: 'MyBills', params: { id: cell.item._id, username: cell.item.username }}">View User's Bills</b-link>
            </template>
        </b-table>
        <div class="d-flex justify-content-between align-items-baseline">
            <span class="input-group w-auto align-items-baseline">
                <span class="input-group-append mr-2">Per Page: </span>
                <b-form-select
                    v-model="limit"
                    :options="[5, 10, 15]"
                    class="custom-select custom-select-sm"
                    @change="getUsers"
                />
            </span>
            <b-pagination
                :per-page="limit"
                :total-rows="totalCount"
                v-model="offset"
                @input="getUsers"
            ></b-pagination>
            <span>{{ totalCount }} Users in {{ Math.ceil(totalCount / limit) }} pages</span>
        </div>
    </div>
</template>

<script lang="js">
import Vue from 'vue'
import { formatDate, formatCost } from "@/utilities";
import api from "@/api/api";

export default Vue.extend({
  name: 'ViewUsers', //Sets the name of file.
  data () {
    return {
      users: [], //Stores the list of users from the api.
      totalCount: 0, //Stores the total count of all users.
      limit: 10, //Stores the amount of items to be displayed in the table.
      offset: 1, //Stores the page number of the table.
      filter: {
        username: '', //Stores the username filter.
        email: '', //Stores the email filter.
      },
    }
  },

  computed: {
    /**
     * Returns a list of headings to be used in the table and states if they are sortable fields.
     */
    fields() {
      return [{key: 'username', sortable: false}, 
        {key: 'email', sortable: false},
        {key: 'Actions', sortable: false}]
    },

    /**
     * Returns a filtered list of users based on the text input filters.
     */
    filteredUsers() {
      return this.users.filter((user) => 
          user.username.includes(this.filter.username) &&
          user.email.includes(this.filter.email)
      )
    }
  },

  methods: {
    formatDate, //Import the format date helper function to be used in the template.
    formatCost, //Import the format cost helper function to be used in the template.

    /*
     * Gets the users from the api functions and returns the data.
     */
    async getUsers() {
      const data = await api.getAllUsers({limit: this.limit, offset: parseInt(this.offset - 1), type: "Driver"})
      this.users = data.users
      this.totalCount = data.count
    }
  },

  /**
   * Gets a list of users on create.
   */
  async created() {
    await this.getUsers();
  }
})
</script>