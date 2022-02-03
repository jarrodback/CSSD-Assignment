<template>
  <div>
    <navbar/>
    <router-view class="container"/>
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
export default {
  name: 'App',
  components: {Navbar}
}
</script>

