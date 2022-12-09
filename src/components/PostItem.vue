<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-buttons
        @click="$emit('remove', post)">Удалить</my-buttons>
    </div>
    
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
import MyButtons from './UI/MyButtons.vue'
export default {
  components: { MyButtons },
  props: {
    post: {
      type: Object,
      requared: true,
    }
  }
}
</script>