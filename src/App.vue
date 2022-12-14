<template>  
  <div class="app">           
    <navbar></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
    
  </div>
  
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  width: 100%;
}

.container {
  max-width: 880px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
</style>