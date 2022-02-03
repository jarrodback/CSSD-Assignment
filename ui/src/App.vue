<template>
  <div>
    <navbar/>
    <router-view class="container"/>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: 'App', //Sets the name of file.
  components: {Navbar} //Declares the component to be used in the tempalte.
}
</script>

