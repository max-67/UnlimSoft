<template>
  <Header />
  <router-view style="margin: 10px"></router-view>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.mt-5 {
  margin-top: 10px;
}

.mr-4 {
  margin-right: 8px;
}

.mb-4 {
  margin-bottom: 8px;
}
</style>
