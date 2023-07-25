<template>
  <div>
    <div class="tables-container mt-5">
      <DataTable 
        class="p-datatable-sm" 
        :sortField="(i) => `${i.surname} ${i.name}`" 
        :sortOrder="1" 
        @row-dblclick="movePlayerToGroup($event)" 
        :value="players"
        style="width: 40%;"
      >
        <Column header="№">
          <template #body="{index}">
            <div>
              {{ index + 1 }}
            </div>
          </template>
        </Column>
        <Column sortable :field="(i) => `${i.surname} ${i.name}`" header="Участник"></Column>
        <Column sortable :field="(i) => formatDate(i.birthday)" header="Дата рождения"></Column>
      </DataTable>
      <template v-for="group in groups" :key="group.group_id">
        <DataTable 
          class="p-datatable-sm" 
          :sortField="(i) => `${i.surname} ${i.name}`" 
          :sortOrder="1" 
          @row-dblclick="movePlayerBack($event, group.group_id)" 
          :value="getPlayersInGroup(group.group_id)" 
          :style="{ width: `calc((100% - 40%) / ${groups.length})` }"
        >
          <template #empty>
            <div class="d-flex-center" style="width: 100%;">
              <span class="empty_slot">Список пуст</span>
            </div>
          </template>
          <Column :field="(i) => `${i.surname} ${i.name}`">
            <template #header>
              <div class="d-flex-center" style="width: 100%">
                <span >Группа {{ group.group_id }}</span>
              </div>
            </template>
            <template #body="{data}">
              <span class="d-flex-center">{{ data.surname }} {{ data.name }}</span>
            </template>
          </Column>
        </DataTable>
      </template>
    </div>
    <Button 
      @click="save()" 
      style="width: 100%"
      class="mt-5" 
      label="Сохранить" 
      severity="success"
    ></Button>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

export default {
  name: 'Groups',
  components: {
    DataTable,
    Column,
    Button
  },
  data() {
    return {
      saved: true,
      players: [
        {
          "id": 164679,
          "name": "Руслан",
          "surname": "Иванов",
          "birthday": "2009-07-07",
        },
        {
          "id": 163246,
          "name": "Артем",
          "surname": "Пулов",
          "birthday": "1998-08-09",
        },
        {
          "id": 164535,
          "name": "Иван",
          "surname": "Путров",
          "birthday": "2007-04-10",
        },
        {
          "id": 163604,
          "name": "Александр",
          "surname": "Назаров",
          "birthday": "2004-10-06",
        },
        {
          "id": 163636,
          "name": "Иван",
          "surname": "Киселев",
          "birthday": "2005-10-29",
        },
        {
          "id": 164836,
          "name": "Ольгерд",
          "surname": "Ковенко",
          "birthday": "2006-12-25",
        },
        {
          "id": 164101,
          "name": "Павел",
          "surname": "Кондратьев",
          "birthday": "1985-10-20",
        },
        {
          "id": 164457,
          "name": "Иван",
          "surname": "Ковенко",
          "birthday": "2006-07-18",
        },
        {
          "id": 162937,
          "name": "Александр",
          "surname": "Миронов",
          "birthday": "2000-03-29",
        },
        {
          "id": 164009,
          "name": "Артем",
          "surname": "Красковский",
          "birthday": "1985-10-20",
        },
      ],
      groups: [
        {
          group_id: 1,
          players: []
        },
        {
          group_id: 2,
          players: []
        },
        {
          group_id: 3,
          players: []
        },
      ],
      players_in_groups: []
    };
  },
  methods: {
    /**
     * Saves players in groups.
     */
    save() {
      const data = [];
      for (const group of this.groups) {
        for (const player of group.players) {
          data.push({
            player_id: player.id,
            group_id: group.group_id
          });
        }
      }
      this.saved = true;
      console.log(data);
    },
    /**
     * Converts a date to the format (dd.MM.yyyy).
     * @param {Date} date Date in other format.
     * @returns {Date} Formatted date (dd.MM.yyyy).
     */
    formatDate(date) {
      return format(parseISO(date), 'dd.MM.yyyy');
    },
    /**
     * Returns players in a group.
     * @param {Number} group_id
     * @returns {Array} players in a group.
     */
    getPlayersInGroup(groupId) {
      const groupSelected = this.groups.find((i) => i.group_id == groupId);
      return groupSelected.players;
    },
    /**
     * Moves a player to the player list.
     * @param {*} e 
     * @param {*} group_id 
     */
    movePlayerBack(e, groupId) {
      const groupSelected = this.groups.find((i) => i.group_id == groupId);
      const playerSelectedIndex = groupSelected.players.findIndex((i) => i.id == e.data.id);
      const playerSelected = groupSelected.players[playerSelectedIndex];
      const playerSelectedCopy = JSON.parse(JSON.stringify(playerSelected));

      this.players.push(playerSelectedCopy);
      groupSelected.players.splice(playerSelectedIndex, 1);
      this.saved = false;
    },
    /**
     * Moves a player to a group.
     * @param {*} e
     */
    movePlayerToGroup(e) {
      const playerSelectedIndex = this.players.findIndex((i) => i.id == e.data.id);
      const playerSelected = this.players[playerSelectedIndex];
      const playerSelectedCopy = JSON.parse(JSON.stringify(playerSelected));

      for (const group of this.groups) {
        if (group.players.length < 3) {
          group.players.push(playerSelectedCopy);
          this.players.splice(playerSelectedIndex, 1);
          this.saved = false;
          return;
        }
      }
      alert('Места в группах закончились!');
    }
  },
  mounted() {
    this.$router.beforeEach(() => {
      if (!this.saved) {
        if (confirm('Сохранить изменения?')) {
          this.save();
        }
      }
      return this.saved
    });

    const beforeUnloadFunction = ((event) => {
      if (!this.saved) {
        if (confirm('Сохранить изменения?')) {
          this.save();
        }
        event.preventDefault();
        event.returnValue = "";
      }
    });
    window.addEventListener('beforeunload', beforeUnloadFunction);
  }
}
</script>

<style scoped>
.tables-container {
  display: flex; 
  gap: 10px;
}
.empty_slot {
  color: rgb(135, 135, 135);
}

.d-flex-center {
  display: flex;
  justify-content: center;
}
</style>
