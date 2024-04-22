<template>
  <div>
      <div class="input-group">
        <label for="slug">slug:</label>
        <input type="text" id="slug" v-model="slug">
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
import { fetchQuotesByAuthor} from '../services/apiService';

//   translate.engine = "google"; // "google", "yandex", "libre", "deepl"
//   translate.key = process.env.DEEPL_KEY;

export function useQuotesByAuthor(){
      const quotesResult = ref([]);  
      const slug = ref('');
      const limit = ref(20); // Valor padrão para o limite
     
      const search = async () => {
          try {
          const translatedTags = await translate("tecnologia", { to: 'en' });  
          console.log(translatedTags);

          const quotes = await fetchQuotesByAuthor({
              slug: slug.value,
              limit: limit.value
          });
          quotesResult.value = quotes.results;
          console.log(quotes); // Faça algo com os resultados da pesquisa
          
          } catch (error) {
          console.error('Erro ao pesquisar citações:', error);
          }
    };

    return { slug, limit, search };
  }
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
</style>