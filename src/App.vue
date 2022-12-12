<template>
  <div class="app">
    <div class="app__btns">
      <my-buttons @click="showPopup">Написать пост</my-buttons>
      <my-selects v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-inputs v-model="searchQuery" placeholder="Поиск...">
    </my-inputs>

    <my-popups v-model:show="popupVisible">
      <post-form @create="createPost" />
    </my-popups>

    <div v-if="!isLoading">
      <post-list :posts="sortedAndSearchPosts" @remove="removePost" />
    </div>

    <div v-else>Идет загрузка...</div>

    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber" 
        :class="{
          'page__active': page === pageNumber
        }"
        class="page"
        @click="changePage(pageNumber)"
      >{{ pageNumber }}</div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  max-width: 880px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.app__btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin: 15px 0px;
}
.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
  margin: 0px 10px;
}

.page__active {
  border: 2px solid teal;
  background-color: teal;
}
</style>
  
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';

export default {
  components: {
    PostList, PostForm
  },

  data() {
    return {
      posts: [],
      popupVisible: false,
      isLoading: false, //лоадер загрузки постов
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },

  methods: {
    createPost(post) {
      console.log(post)
      this.posts.unshift(post); // кидаем пост в массив
      this.popupVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id); // фильтруем список постов по id, что не совпадает по id оставляем
    },    
    showPopup() {
      this.popupVisible = true;
    },

    changePage(pageNumber) {
      this.page = pageNumber,
      this.fetchPost()
    },

    //получаем данные по API
    async fetchPost() {            
      try {
        this.isLoading = true;
        // загрузка постов после таймаута в 3 сек. 
         setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit,
            }
          });
          this.isLoading = false;
          //вычесление кол-ва страниц с округлением в большую сторону
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)          
          this.posts = response.data;          
          //помещыем в модель постов пост полученный с сервера
        }, 3000);
        
      } catch(e) {
        console.log('Произошла ошибка. Повторите попытку позже')
      }
    }
  },

  mounted() {
    this.fetchPost(); // загрузка постов с АПИ сразу при загрузхке страницы
  },

  computed: {

    // сортировка без мутации основного массива
    sortedPosts() {
      return [...this.posts].sort((a, b) => a[this.selectedSort]?.localeCompare(b [this.selectedSort])
      )
    }, 

    //регистронезависимый поиск и фильтрация постов по названию
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },

  watch: {
  //   // сортировка с мутацией основного массива
  //   selectedSort(newValue) {
  //     this.posts.sort((a, b) => {
  //       return a[newValue]?.localeCompare(b[newValue])
  //     })
  //   }
  }
}
</script>

