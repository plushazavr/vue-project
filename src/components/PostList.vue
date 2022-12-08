<template>
  <div
    class="post"
    v-for="post in posts"
    :key="post"
  >
    <div><strong>Название:</strong>{{ post.title }}</div>
    <div><strong>Описание:</strong>{{ post.body }}</div>
  </div>
</template>

<style scoped>
  .post {
    margin: 15px 0px;
    padding: 15px;
    border: 2px solid teal;
  }
</style>

<script>
export default {
  props: {
    posts: {
      type: Array,
      requared: true,
    }
  }
}
</script>