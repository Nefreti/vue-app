<template>
  <v-container>
    <v-data-table :headers="headers" :items="listOfPeople" :items-per-page="itemsPerPage" class="elevation-1">
      <template v-slot:item.films="{ item }">
        <v-list-item v-for="(title, index) in item.foundTitle" :key="index" link>
          <v-list-item-title>{{ title.title }}</v-list-item-title>
          <Show-more :item-for-action="title"/>
        </v-list-item>
      </template>
      <template v-slot:item.starships="{ item }">
        <v-list-item v-for="(ship, index) in item.foundShips" :key="index" link>
          <v-list-item-title>{{ ship.name }}</v-list-item-title>
          <Show-more-ships :item-for-action="ship"/>
        </v-list-item>
      </template>
      <template v-slot:item.edited="{ item }">
        <v-chip>
          {{ item.edited}}
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
    pagination: {
      sortBy: 'name'
    },
    loader: false,
    headers: [
      {text: 'name', value: 'name'},
      {text: 'birth_year', value: 'birth_year'},
      {text: 'eye_color', value: 'eye_color'},
      {text: 'films', value: 'films'},
      {text: 'starships', value: 'starships'},
      {text: 'homeworld', value: 'homeworld'},
      {text: 'edited', value: 'edited'},

    ],
    listOfPeople: [],
    itemsPerPage: 4,
  }),
  created() {
    return this.getListOfPeople()


  },
  methods: {
    // async getHomeworldsForPeople() {
    //   try {
    //          } catch(err) {
    //     console.log("error: ", err)
    //   }
    // },


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
      } catch (error) {
        console.log(error)
      }
    },
    // async getStarshipsForPeople() {
    //   try {
    //     let starships = []
    //     this.listOfPeople.forEach(p => starships.push(...p.starships))
    //     let promises = starships.map(async (ship) => {
    //       return axios.get(ship);
    //     });
    //
    //     let resolvePromise = await Promise.all(promises)
    //     let startshipList = []
    //     resolvePromise.forEach(p => startshipList.push(p.data))
    //
    //     this.listOfPeople.forEach(p => {
    //       startshipList.filter(sh => {
    //         if (p.starships.some(u => sh.url === u)) {
    //           p.foundShips.push(sh)
    //         }
    //       })
    //     })
    //   } catch (err) {
    //     console.log("error: ", err)
    //   }
    // },

    async getListOfPeople() {
      this.loader = true
      try {
        let people = await axios.get(`https://swapi.dev/api/people/`)
        this.listOfPeople = people.data.results
        this.listOfPeople.forEach(p => {
          p.foundShips = []
          p.foundTitle = []
          p.foundHomeworld = []
        })
        await this.getMoviesForPeople()
        // await this.getStarshipsForPeople()
        // await this.getHomeworldsForPeople()
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

  dateFormatting(item) {
    let date = new Date(item)
    return date.toISOString().split('T')[0];
  },

}
</script>

<style scoped>
.v-data-table-header__icon {
  opacity: 1;
}
</style>
