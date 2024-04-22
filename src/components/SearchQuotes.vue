<template>
  <div>
      <div class="input-group">
        <label for="query">query:</label>
        <input type="text" id="query" v-model="query">
      </div>
      <button @click="search">Pesquisar</button>
  </div>   
</template>
<script>

  import { ref } from 'vue';
  import translate from "translate";
  import { fetchSearchQuotes } from '../services/apiService';

  // translate.engine = "google"; // "google", "yandex", "libre", "deepl"
  // translate.key = process.env.DEEPL_KEY;
  
  export function useSearchQuotes() {
        const quotesResult = ref([]);  
        const query = ref('');
      
        const search = async () => {
            try {
            const translatedTags = await translate("tecnologia", { to: 'en' });  
            console.log(translatedTags);

            const quotes = await fetchSearchQuotes({
                query: query.value,
            });

            quotesResult.value = quotes.results;
            console.log(quotes); // Faça algo com os resultados da pesquisa
            
            } catch (error) {
            console.error('Erro ao pesquisar citações:', error);
            }
      };
  
      return { query, search };
    }

</script>
<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
</style>