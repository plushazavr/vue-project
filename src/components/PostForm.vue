<template>
  <form @submit.prevent>
      <h2>Создать пост</h2>
      <input
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Название"
      />
      <input
      v-model="post.body"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button
        @click="createPost"
        class="btn"
      >Опубликовать</button>
    </form>
</template>

<style scoped>
  .input {
    max-width: 500px;
    min-width: 400px;
    border: 1px solid teal;
    padding: 10px 15px;
    margin: 15px 0px;
  }

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