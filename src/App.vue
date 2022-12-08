<template>
  <div class="app">
    <form @submit.prevent>
      <h2>Создать пост</h2>
      <input
        v-bind:value="title"
        @input="title = $event.target.value"
        class="input"
        type="text"
        placeholder="Название"
      />
      <input
        v-bind:value="body"
        @input="body = $event.target.value"
        class="input"
        type="text"
        placeholder="Описание"
      />
      <button
        class="btn"
        @click="createPost"
      >Опубликовать</button>
    </form>

    <div
      class="post"
      v-for="post in posts"
      :key="post"
    >
      <div><strong>Название:</strong>{{ post.title }}</div>
      <div><strong>Описание:</strong>{{ post.body }}</div>
    </div>
  </div>

</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .post {
    margin: 15px 0px;
    padding: 15px;
    border: 2px solid teal;
  }

  .input {
    max-width: 500px;
    min-width: 400px;
    border: 1px solid teal;
    padding: 10px 15px;
    margin: 15px 0px;
  }

  .app {
    padding-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
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
      posts: [
        {id: 1, title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'},

        {id: 2, title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'},

        {id: 3, title: 'Lorem ipsum', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
      ],
      title: '',
      body: ''
    }
  },

  methods: {
    createPost() {
      //создадим пост
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      this.posts.push(newPost); //кидаем новый пост в конец массива
      this.title = '';
      this.body = '';
    },

    inpuTitle(event) {
      this.title = event.target.value;
    }
  }
}
</script>

