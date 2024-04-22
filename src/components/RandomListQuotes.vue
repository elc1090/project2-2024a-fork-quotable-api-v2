<template>
  <div>
    <div class="input-group">
      <label for="tags">Tags:</label>
      <input type="text" id="tags" v-model="tags">
    </div>
    <div class="input-group">
      <label for="author">Author:</label>
      <input type="text" id="author" v-model="author">
    </div>
    <div class="input-group">
      <label for="limit">Limit:</label>
      <input type="number" id="limit" v-model.number="limit">
    </div>
    <button @click="search">Pesquisar</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import translate from "translate";
import { fetchRandomListQuotes } from '../services/apiService';

//   translate.engine = "google"; // "google", "yandex", "libre", "deepl"
//   translate.key = process.env.DEEPL_KEY;

export function useRandomListQuotes(){
      const quotesResult = ref([]);  
      const tags = ref('');
      const author = ref('');
      const limit = ref(20); // Valor padrão para o limite
     
      const search = async () => {
          try {
          const translatedTags = await translate("tecnologia", { to: 'en' });  
          console.log(translatedTags);

          const quotes = await fetchRandomListQuotes({
              tags: tags.value,
              author: author.value,
              limit: limit.value
          });
          quotesResult.value = quotes.results;
          console.log(quotes); // Faça algo com os resultados da pesquisa
          
          } catch (error) {
          console.error('Erro ao pesquisar citações:', error);
          }
    };

    return { tags, author, limit, search };
  }
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
</style>