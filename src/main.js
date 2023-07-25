import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router';
import "primevue/resources/themes/lara-light-indigo/theme.css";

// import components
import Main from './components/Main.vue';
import Groups from './components/Groups.vue';

const app = createApp(App);

const routes = [
  { path: '/', component: Main },
  { path: '/groups', component: Groups },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.use(PrimeVue);
app.mount('#app');
