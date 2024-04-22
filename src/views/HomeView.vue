<template>
  <NavBar/>
  <main>
    
    <RandomQuotes/>
    <RandomListQuotes />
    <QuotesByAuthor />
    <SearchQuotes />
    <SearchAuthors/>
  </main>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import RandomQuotes from '../components/RandomQuotes.vue';
import RandomListQuotes from'../components/RandomListQuotes.vue';
import QuotesByAuthor from'../components/QuotesByAuthor.vue';
import SearchQuotes from'../components/SearchQuotes.vue';
import SearchAuthors from '../components/SearchAuthors.vue';
export default{
  name: 'HomeView',
  components:{
    NavBar,
    RandomQuotes,
    RandomListQuotes,
    QuotesByAuthor,
    SearchQuotes,
    SearchAuthors,
  }
}
</script>