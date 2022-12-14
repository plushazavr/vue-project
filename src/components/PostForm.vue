<template>
  <form @submit.prevent>
      <h2>Создать пост</h2>
      <my-inputs
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Название"
      />
      <my-inputs
      v-model="post.body"
        type="text"
        placeholder="Описание"
      />
      <my-buttons
        @click="createPost"
      >Опубликовать</my-buttons>
    </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: flex-start;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
}

.btn:hover {
  color: white;
  background-color: teal;
}
</style>

<script>
export default {
  data() {
    return {
      //модель поста
      post: {
        title: '',
        body: '',
      }
    }
  },

  methods: {
    createPost() {
      // //создадим пост
      // const newPost = {
      //   id: Date.now(),
      //   title: this.title,
      //   body: this.body
      // }
      this.$emit('create', this.post); //генерируем событие, на которое подпишется родительский компонент
      this.post.id = Date.now();
      this.post = {
        title: '',
        body: '',
      }
      
    },

    inpuTitle(event) {
      this.title = event.target.value;
    }
  }
}
</script>