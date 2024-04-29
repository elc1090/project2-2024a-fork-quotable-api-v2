<template>
  <div class="background">
  <NavBar/>
  <main class="text-center">
    <select v-model="selectedComponent" class="form-select border-primary w-25 mt-4 mb-4 mx-auto"> <!-- Adiciona a classe mx-auto para centralizar o select horizontalmente -->
      <option value="RandomQuotes">Citações Aleatórias</option>
      <option value="RandomListQuotes">Lista de Citações Aleatórias</option>
      <option value="SearchQuotes">Procurar Citações</option>
      <option value="SearchAuthors">Procurar Autores</option>
    </select>
    <component :is="selectedComponent" :tags="tags" />
  </main>
</div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import RandomQuotes from '../components/RandomQuotes.vue';
import RandomListQuotes from '../components/RandomListQuotes.vue';
import SearchQuotes from '../components/SearchQuotes.vue';
import SearchAuthors from '../components/SearchAuthors.vue';
import { fetchTags } from '@/services/apiService.js'
import translate from 'translate'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    RandomQuotes,
    RandomListQuotes,
    SearchQuotes,
    SearchAuthors,
  },

  setup() {
    const allTags = [];
    fetchTags().then((resp) => {
      resp.forEach((tag) => {
        translate(tag.name, { from: 'en', to: 'pt' }).then((res) => {
          allTags.push(res);
        })
      });
      console.log(allTags)
    });
    return {
      tags: allTags
    };
  },

  data() {
    return {
      selectedComponent: 'RandomQuotes' // Define o componente inicial a ser mostrado
    };
  }
}
</script>

<style scoped>
</style>
