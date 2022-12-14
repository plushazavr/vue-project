import { createApp } from 'vue'
import App from './App.vue'
import components from "@/components/UI";
import router from "@/router/router";
import directives from '@/directives';

const app = createApp(App);

//регистрация с объектом настроек
components.forEach(component => {
  app.component(component.name, component)
})

directives.forEach(directive => {
  app.directive(directive.name, directive); //подключение пользовательской директивы. 1й пар-р название, 2й файл где описана директива
})


app
  .use(router) //подключение сторонних библиотек, модулей
  .mount('#app')
