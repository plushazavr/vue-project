<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="navbar__logo">PLUSHAZAVR</div>
    <div class="navbar__btns">
      <my-buttons @click="$router.push('/about')">О сайте</my-buttons>
      <my-buttons @click="$router.push('/post')" style="margin-left: 10px">Посты</my-buttons>
    </div>
  </div>
</template>

<script>
import router from '@/router/router';

export default {
  

}
</script>

<style>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 10px 200px;
}
.navbar__btns {
  margin-left: auto;
}

.navbar__logo {
  cursor: pointer;
}

</style>