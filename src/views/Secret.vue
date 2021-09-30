<template>
  <v-container>
    <v-data-table :headers="headers" :items="listOfPeople" :items-per-page="itemsPerPage" class="elevation-1"
                  :sort-by="['name', 'hair_color']"
                  :sort-desc="[true, true]"
                  :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }">
      <template v-slot:item.films="{ item }">
        <v-list-item v-for="(title, index) in item.foundTitle" :key="index">
          <v-list-item-subtitle class="mx-2">{{ title.title }}</v-list-item-subtitle>
          <Show-more :item-for-action="title"/>
        </v-list-item>
      </template>
      <template v-slot:item.starships="{ item }">
        <v-list-item v-for="(ship, index) in item.foundShips" :key="index">
          <v-list-item-subtitle class="mx-2">{{ ship.name }}</v-list-item-subtitle>
          <Show-more-ships :item-for-action="ship"/>
        </v-list-item>
      </template>
      <template v-slot:item.homeworld="{ item }">
        <v-list-item>
          <v-list-item-subtitle class="mx-2">{{ item.foundHomeworldName }}</v-list-item-subtitle>
        </v-list-item>
      </template>
      <template v-slot:item.edited="{ item }">
        <v-chip small color="blue lighten-4">
          {{ item.formattedDate }}
        </v-chip>
      </template>
    </v-data-table>
    <Loader v-if="loader"/>
  </v-container>
</template>

<script>
import axios from 'axios'
import Loader from '@/components/Loader'
import ShowMore from "@/components/ShowMore";
import ShowMoreShips from "@/components/ShowMoreShips";

export default {
  name: 'Secret',
  components: {ShowMoreShips, ShowMore, Loader},
  data: () => ({
    loader: false,
    headers: [
      {text: 'Name', value: 'name'},
      {text: 'Hair color', value: 'hair_color'},
      {text: 'Films', value: 'films'},
      {text: 'Starships', value: 'starships'},
      {text: 'Homeworld', value: 'homeworld'},
      {text: 'Edited', value: 'edited'},

    ],
    listOfPeople: [],
    itemsPerPage: 0,
  }),
  async created() {
    await this.getListOfPeople()
    this.itemsPerPage = this.itemsPerPage + 2
  },

  methods: {
    async getHomeworldsForPeople() {
      try {
        let homeworlds = []
        this.listOfPeople.forEach(p => homeworlds.push(p.homeworld))
        console.log('Homeworlds', homeworlds)
        let promises = homeworlds.map(async (planet) => {
          return axios.get(planet);
        });
        let resolvePromise = await Promise.all(promises)
        let homeworldsList = []
        resolvePromise.forEach(p => homeworldsList.push(p.data))

        this.listOfPeople.forEach(p => {
          homeworldsList.filter(h => {
            if (p.homeworld === h.url) {
              p.foundHomeworldName = h.name
            }
          })
        })
        console.log('foundHomeworld', homeworldsList)


      } catch (err) {
        console.log("error: ", err)
      }
    },

    async getMoviesForPeople() {
      try {
        let films = await axios.get(`https://swapi.dev/api/films/`)
        let filmLists = films.data.results
        this.listOfPeople.forEach(p => {
          filmLists.filter(m => {
            if (p.films.some(u => m.url === u)) {
              p.foundTitle.push(m)
            }
          })
        })
        console.log('films', filmLists)
      } catch (error) {
        console.log(error)
      }
    },
    async getStarshipsForPeople() {
      try {
        let starships = []
        this.listOfPeople.forEach(p => starships.push(...p.starships))
        let promises = starships.map(async (ship) => {
          return axios.get(ship);
        });
        let resolvePromise = await Promise.all(promises)
        let startshipList = []
        resolvePromise.forEach(p => startshipList.push(p.data))

        this.listOfPeople.forEach(p => {
          startshipList.filter(sh => {
            if (p.starships.some(u => sh.url === u)) {
              p.foundShips.push(sh)
            }
          })
        })
        console.log('startshipList', startshipList)
      } catch (err) {
        console.log("error: ", err)
      }
    },
    async getListOfPeople() {
      this.loader = true
      try {
        let people = await axios.get(`https://swapi.dev/api/people/`)
        this.listOfPeople = people.data.results

        this.listOfPeople.forEach(p => {
          p.foundShips = []
          p.foundTitle = []
          p.foundHomeworldName = null
          p.formattedDate = new Date(p.edited).toISOString().split('T')[0]
        })
        await this.getMoviesForPeople()
        await this.getStarshipsForPeople()
        await this.getHomeworldsForPeople()
        console.log('People', this.listOfPeople)
      } catch (error) {
        console.log(error)
      } finally {
        this.loader = false
      }
    }
  },

  loadMore() {
    return this.itemsPerPage = this.itemsPerPage + 2
  },

}
</script>

<style scoped>
.v-data-table-header__icon {
  opacity: 1;
}
</style>
