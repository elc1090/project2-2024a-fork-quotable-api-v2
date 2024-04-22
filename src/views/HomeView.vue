<template>
  <NavBar/>
  <main>
    <select v-model="selectedComponent">
      <option value="RandomQuotes">RandomQuotes</option>
      <option value="RandomListQuotes">RandomListQuotes</option>
      <option value="SearchQuotes">SearchQuotes</option>
      <option value="SearchAuthors">SearchAuthors</option>
    </select>
    <component :is="selectedComponent" />
  </main>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import RandomQuotes from '../components/RandomQuotes.vue';
import RandomListQuotes from'../components/RandomListQuotes.vue';
import SearchQuotes from'../components/SearchQuotes.vue';
import SearchAuthors from '../components/SearchAuthors.vue';
export default{
  name: 'HomeView',
  components:{
    NavBar,
    RandomQuotes,
    RandomListQuotes,
    SearchQuotes,
    SearchAuthors,
  },
  data() {
    return {
      selectedComponent: 'RandomQuotes' // Define o componente inicial a ser mostrado
    };
  }
}
</script>