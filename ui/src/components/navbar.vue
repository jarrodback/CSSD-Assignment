<template>
  <b-navbar class="shadow">
    <div class="d-flex align-items-center">
      <img src="@/assets/creditcard.png" alt="Self Service Portal Logo"/>
      <h4 class="ml-3 mb-0">Self Service Portal</h4>
    </div>
    <b-navbar-nav class="ml-auto">
      <b-nav-item right class="mr-3">
        <img src="@/assets/support.png" alt="support icon" height="50" class="mr-2" />Help
      </b-nav-item>
      <b-nav-item-dropdown right class="mr-3">
        <template #button-content>
          <img src="@/assets/global.png" alt="language icon" height="50" class="mr-2"/>{{ selectedLanguage }}
        </template>
        <b-dropdown-item v-for="lang in languages" :key="lang" @click="language = lang">{{lang}}</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right class="mr-3">
        <template #button-content>
          <img src="@/assets/money.png" alt="money icon" height="50" class="mr-2" />{{ selectedCurrency }}
        </template>
        <b-dropdown-item @click="updateCurrencies('NOK')">NOK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('SEK')">SEK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('ISK')">ISK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('DKK')">DKK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('GBP')">GBP</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('EUR')">EUR</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right>
        <template #button-content>
          <img src="@/assets/profile.png" alt="profile icon" height="50" />
        </template>
        <b-dropdown-item>Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store/store'
export default Vue.extend({
  name: "navbar",
  data() {
    return {
      language: 'English',
      currency: 'NOK'
    }
  },
  methods: {
    updateCurrencies(selectedCurrency) {
      this.currency = selectedCurrency
      store.dispatch('updateSelectedCurrency', selectedCurrency)
    }
  },
  computed: {
    languages() {
      return ['Bulgarian', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Finnish', 'French', 'German', 'Greek', 'Hungarian', 'Irish', 'Italian', 'Latvian', 'Lithuanian', 'Maltese', 'Polish', 'Portuguese', 'Romanian', 'Slovak', 'Slovene', 'Spanish', 'Swedish']
    },
    selectedLanguage() {
      return this.language
    },
    selectedCurrency() {
      return this.currency
    }
  },
  created() {
    store.dispatch('updateSelectedCurrency', this.currency)
  }
})
</script>