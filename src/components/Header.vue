<template>
  <header class="head">
    <div class="title mb-4">
      UnlimSoft
    </div>
    <router-link to="/" class="link_text mr-4" :class="{'selected': selectedRoute == '/'}">Главная</router-link>
    <router-link to="/groups" class="link_text" :class="{'selected': selectedRoute == '/groups'}">Группы</router-link>
  </header>
</template>

<script>

export default {
  name: 'Header',
  computed: {
    /**
     * Returns the current route.
     * @returns {String} Current route.
     */
    selectedRoute() {
      return this.$route.path;
    }
  }
}
</script>

<style scoped>
.head {
  background-color: aliceblue;
  padding: 10px;
}

.title {
  font-size: 24px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.link_text:active,
.link_text {
  font-size: 20px;
  text-decoration: none;
  color: black;
  font-family:'Times New Roman', Times, serif
}
.selected {
  color: rgb(118, 186, 97);
}
</style>