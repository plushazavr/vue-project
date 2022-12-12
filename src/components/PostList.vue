<template>
  <div v-if="posts.length > 0">
    <transition-group name="post-list">
      <post-item
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"/>
    </transition-group>
    
  </div>
  <h2 v-else>Список постов пуст</h2>
</template>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move {
  transition: transform 0.5s ease;
}
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