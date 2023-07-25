<template>
  <div class="main-content">
    <Card class="card mt-5">
      <template #title>Информация</template>
      <template #content>
        <ul>
          <li>ФИО - Аммосов Максим Александрович</li>
          <li>Гражданство - Российская Федерация</li>
          <li>Возраст - 23 года</li>
        </ul>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';

export default {
  name: 'Main',
  components: {
    Card
  }
}
</script>

<style scoped>
.main-content {
  display: flex; 
  justify-content: center;
}

.card {
  width: 50%;
}

</style>
