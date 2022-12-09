<template>
  <div v-if="posts.length > 0">
    <post-item
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"/>
  </div>
  <h2 v-else>Список постов пуст</h2>
</template>

<style scoped>  
</style>

<script>
import PostItem from "@/components/PostItem.vue"

export default {
  components: {
    PostItem
  },

  props: {
    posts: {
      type: Array,
      requared: true,
    }
  }
}
</script>