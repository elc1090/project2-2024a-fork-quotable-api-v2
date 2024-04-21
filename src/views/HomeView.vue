<template>
  <NavBar/>
  <main>
    <RandomQuotes v-if="currentComponent === 'RandomQuotes'"/>
    <RandomListQuotes v-if="currentComponent === 'RandomListQuotes'"/>
    <QuotesByAuthor v-if="currentComponent === 'QuotesByAuthor'"/>
    <SearchQuotes v-if="currentComponent === 'SearchQuotes'"/>
    <SearchAuthors v-if="currentComponent === 'SearchAuthors'"/>
  </main>
</template>
<script setup>
import NavBar from '../components/NavBar.vue'
import RandomQuotes from '../components/RandomQuotes.vue';
import RandomListQuotes from'../components/RandomListQuotes.vue';
import QuotesByAuthor from'../components/QuotesByAuthor.vue';
import SearchQuotes from'../components/SearchQuotes.vue';
import SearchAuthors from '../components/SearchAuthors.vue';

let currentComponent = 'RandomQuotes'; // Define o componente inicial a ser exibido

// Função para alternar entre os componentes
function setCurrentComponent(componentName) {
  currentComponent = componentName;
}
</script>