<template>
  <div>
    <post-item
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"/>
  

  </div>
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