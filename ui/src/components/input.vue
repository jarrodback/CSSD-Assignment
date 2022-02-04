<template>
  <label class="w-100 mb-0">
    {{ label }}
    <ValidationProvider :name="label" :rules="rules" v-slot="{ errors }">
      <b-input :placeholder="placeholder" :type="type" v-bind="$attrs" v-on="$listeners" :class="errors.length > 0 ? 'border-danger' : ''"/>
      <span class="text-danger">{{ errors[0]}}</span>
    </ValidationProvider>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationProvider } from 'vee-validate'

export default Vue.extend({
  name: "Input",
  components: { ValidationProvider }, //Import validation provider to enforce validation rules.
  props: {
    type: String, //Type of input.
    label: String, //Label and name of input.
    rules: String, //Validation rules which should be applied to the input.
    placeholder: String //Placeholder for the input.
  }
})
</script>