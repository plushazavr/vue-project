<template>
  <div>
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

    <div ref="observer" class="observer"></div>

    <!-- пагинация, можно вынести в отдельный компонент -->
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber" 
        :class="{
          'page__active': page === pageNumber
        }"
        class="page"
        @click="changePage(pageNumber)"
      >{{ pageNumber }}</div>
    </div> -->
  </div>
</template>

<style>

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
  background-color: teal;
  color: white;
  border: 1px solid teal;
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

    // ДЛЯ ПАГИНАЦИИ
    // changePage(pageNumber) {
    //   this.page = pageNumber
    //   //this.fetchPost()
    // },

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
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
          
          // перезаписываем посты
          this.posts = response.data;          
          //помещыем в модель постов пост полученный с сервера
        }, 1000);
        
      } catch(e) {
        console.log('Произошла ошибка. Повторите попытку позже')
      }
    },

    async loadMorePost() {            
      try {
        this.page += 1;
        // загрузка постов после таймаута в 3 сек. 
         setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit,
            }
          });
          //вычесление кол-ва страниц с округлением в большую сторону
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
          //создаем новый массив, добавляем в конец новые посты с сервера   
          this.posts = [...this.posts, ...response.data];          
          //помещыем в модель постов пост полученный с сервера
        });
        
      } catch(e) {
        console.log('Произошла ошибка. Повторите попытку позже')
      }
    }

  },

  mounted() {
    this.fetchPost(); // загрузка постов с АПИ сразу при загрузхке страницы

    console.log(this.$refs.observer)
    // Intersection Observer API для бесконечного скролла
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if(entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePost();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)

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
    // НАБЛЮДАТЕЛЬ ДЛЯ ПАГИНАЦИИ
    // page() {
    //   this.fetchPost()
    // }
  //   // сортировка с мутацией основного массива
  //   selectedSort(newValue) {
  //     this.posts.sort((a, b) => {
  //       return a[newValue]?.localeCompare(b[newValue])
  //     })
  //   }
  }
}
</script>

