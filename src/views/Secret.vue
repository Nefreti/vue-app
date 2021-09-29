<template>
    <v-container>
      <h1>Secret</h1>
           <v-data-table
            :headers="headers"
            :items="listOfPeople"
            :items-per-page="itemsPerPage"
            class="elevation-1"
          >
             <template v-slot:item.films="{ item }">
               <v-list-item v-for="(title, index) in item.foundTitle" :key="index" link>
                 <v-list-item-title>{{ title.title }}</v-list-item-title>
                <show-more :item-for-action="title"/>

               </v-list-item>
             </template>
             <template v-slot:item.edited="{ item }">
               <v-chip>
                 {{item.edited}}
               </v-chip>
             </template>
           </v-data-table>

        <Loader v-if="loader"/>
    </v-container>
</template>

<script>
import axios from 'axios'
import Loader from '@/components/Loader'
import ShowMore from "@/components/showMore";
export default {
  name: 'Secret',
  components: {ShowMore, Loader },
  data: ()=>({
    pagination: {
      sortBy: 'name'
    },
    loader: false,
    headers: [
      { text: 'name', value: 'name' },
      { text: 'birth_year', value: 'birth_year' },
      { text: 'eye_color', value: 'eye_color' },
      { text: 'films', value: 'films' },
      { text: 'edited', value: 'edited' },

    ],
    listOfPeople: [],
    itemsPerPage: 4,
    listOfFilms: []

  }),
  created(){
    return this.getListOfPeople()


  },
  methods: {
    async getListOfPeople(){
      this.loader = true
        try{
        let people = await axios.get(`https://swapi.dev/api/people/`)
          let peopleList = people.data.results
         let films = await axios.get(`https://swapi.dev/api/films/`)
          let filmLists = films.data.results
          console.log('Films', filmLists)

          peopleList.forEach(p => {
            let urls = p.films
            console.log('urls', urls)
            let matchedMovies = filmLists.filter(m => {
             if(urls.some(u => m.url === u)) {
               return m
             }

            })
            p.foundTitle = matchedMovies
            console.log('matched movies', matchedMovies)

          })
          this.listOfPeople = peopleList
          console.log('People', this.listOfPeople)

      } catch (error){
        console.log(error)
      } finally {
        this.loader = false
      }
    }},
    loadMore(){
      return this.itemsPerPage = this.itemsPerPage + 2
    },

  editedDate(date) {
    return new Date(date).toISOString().split('T')[0];

  },

}
</script>

<style scoped>
.v-data-table-header__icon {
  opacity: 1;
}
</style>
