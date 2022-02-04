<template>
  <b-navbar class="shadow" id="navbar">
    <a href="/my-bills" class="d-flex align-items-center text-decoration-none">
      <img src="@/assets/creditcard.png" alt="Self Service Portal Logo" />
      <h4 class="ml-3 mb-0 text-decoration-none">Self Service Portal</h4>
    </a>
    <b-navbar-nav class="ml-auto">
      <b-nav-item right class="mr-3" id="support" :to="{ name: 'Help' }">
        <img src="@/assets/support.png" alt="support icon" height="50" class="mr-2" />Help
      </b-nav-item>
      <b-nav-item-dropdown right class="mr-3" id="languages">
        <template #button-content>
          <img src="@/assets/global.png" alt="language icon" height="50" class="mr-2"/><span id="selected-language">{{ selectedLanguage }}</span>
        </template>
        <b-dropdown-item v-for="lang in languages" :key="lang" @click="language = lang" :id="lang">{{lang}}</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right class="mr-3" id="currencies">
        <template #button-content>
          <img src="@/assets/money.png" alt="money icon" height="50" class="mr-2" /><span id="selected-currency">{{ selectedCurrency }}</span>
        </template>
        <b-dropdown-item @click="updateCurrencies('NOK')" id="NOK">NOK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('SEK')" id="SEK">SEK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('ISK')" id="ISK">ISK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('DKK')" id="DKK">DKK</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('GBP')" id="GBP">GBP</b-dropdown-item>
        <b-dropdown-item @click="updateCurrencies('EUR')" id="EUR">EUR</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right id="profile">
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
  name: "navbar", //Sets the name of the file.
  data() {
    return {
      language: 'English', //The selected language.
      currency: 'NOK' //The selected currency.
    }
  },
  methods: {
    /**
     * Updates the selected currency in the store.
     * @param selectedCurrency
     */
    updateCurrencies(selectedCurrency) {
      this.currency = selectedCurrency
      store.dispatch('updateSelectedCurrency', selectedCurrency)
    }
  },
  computed: {
    /**
     * Returns a list of language options which are displayed in the languages dropdown.
     */
    languages() {
      return ['Bulgarian', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Finnish', 'French', 'German', 'Greek', 'Hungarian', 'Irish', 'Italian', 'Latvian', 'Lithuanian', 'Maltese', 'Polish', 'Portuguese', 'Romanian', 'Slovak', 'Slovene', 'Spanish', 'Swedish']
    },
    /**
     * Sets the selected language.
     */
    selectedLanguage() {
      return this.language
    },
    /**
     * Sets the selected currency.
     */
    selectedCurrency() {
      return this.currency
    }
  },
  /**
   * Sets the selected currency on create.
   */
  created() {
    store.dispatch('updateSelectedCurrency', this.currency)
  }
})
</script>