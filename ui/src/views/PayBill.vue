<template>
  <div class="mt-4">
    <h1 class="mb-4">Payment</h1>
    <b-card class="mb-3">
      Your total charge {{ formatCost(bill.cost) }} for the journey on {{ formatDate(bill.journey.journeyDateTime)}}
    </b-card>
    <div class="d-flex">
      <b-card class="mr-3 w-50">
        <h4 class="black-text">Payment Details</h4>
        <ValidationObserver ref="observer">
          <Input label="Cardholder's name" rules="required" placeholder="Cardholder's name" v-model="paymentDetails.cardholderName" />
          <Input label="Card number" rules="required" placeholder="Card number" @keypress="onlyNumber" class="mt-2" :maxlength="16" v-model="paymentDetails.cardNumber"/>
          <div class="d-flex mt-2">
            <Input label="CVV" rules="required" placeholder="CVV" class="mr-3" @keypress="onlyNumber" :maxlength="3" v-model="paymentDetails.cvv"/>
            <Input label="Expiry Date" type="date" rules="required" placeholder="Expiry Date" class="w-50" v-model="paymentDetails.expiryDate"/>
          </div>
        </ValidationObserver>
      </b-card>
      <div class="w-50">
        <b-card class="mb-2">
          <h4 class="black-text pb-2">Journey Details</h4>
          <p>Entry location: {{ bill.journey.entryLocation.name }}</p>
          <p>Exit location: {{ bill.journey.exitLocation.name }}</p>
          <p>Registration Number: {{ bill.journey.regNumber }}</p>
          <p class="mb-0">Journey date: {{ formatDate(bill.journey.journeyDateTime) }}</p>
        </b-card>
        <div class="d-flex mt-2">
          <b-button class="mr-2 w-100" variant="primary" @click="payBill">Pay</b-button>
          <b-button class="w-25" variant="primary" @click="payBillViaPayPal">PayPal</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import api from '../api/api'
import { formatCost, formatDate } from "@/utilities";
import Input from '../components/input'
import { ValidationObserver } from 'vee-validate'

export default Vue.extend({
  name: "PayBill", //Sets the name of file.
  components: { Input, ValidationObserver }, //Import the custom input field
  data() {
    return {
      bill: {
        journey: {
          journeyDateTime: '', //Completed Journey Date and Time.
          entryLocation: {
            name: '' //Name of the entry location.
          },
          exitLocation: {
            name: '' //Name of the exit location.
          }
        }
      }, //Stores the bill.
      paymentDetails: {
        cardholderName: '', //Cards Cardholder name.
        cardNumber: '', //Cards card number.
        cvv: '', //Cards CVV number.
        expiryDate: '' //Cards expiry date.
      }
    }
  },
  methods: {
    formatDate, //Import the format date helper function to be used in the template.
    formatCost, //Import the format cost helper function to be used in the template.
    async payBillViaPayPal() {
      api.payBill(this.bill._id).catch((error) => {
        this.$bvToast.toast(error.message, { //Create red toast to show error.
          title: 'Payment Failed',
          variant: 'danger',
          solid: true
        })
      });

      await this.$router.push({name: 'MyBills'})
    },
    async payBill() {
      const valid = await this.$refs.observer.validate() //Check if the payment details are valid.
      if (!valid) {
        return
      }
      
      api.payBill(this.bill._id).catch((error) => {
        this.$bvToast.toast(error.message, { //Create red toast to show error.
          title: 'Payment Failed',
          variant: 'danger',
          solid: true
        })
      });
      
      await this.$router.push({name: 'MyBills'}) //Return user to the my bills page.
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which); //Get inputted keycode
      if ((keyCode < 48 || keyCode > 57)) { // checks if the value is a letter or .
        $event.preventDefault();
      }
    }
  },
  async created() {
    this.bill = await api.getBillById(this.$route.params.id) //Gets the selected bill by
  }
})
</script>