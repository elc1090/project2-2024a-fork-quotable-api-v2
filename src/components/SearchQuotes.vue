<template>
  <div>
    <div class="input-group">
      <label for="query">Query:</label>
      <input type="text" id="query" v-model="query">
    </div>
    <button @click="search">Pesquisar</button>

    <div v-if="showResult">
      <div v-for="(item, index) in filterResponse" :key="index">
        <p>Author: {{ item.author }}</p>
        <p>Content: {{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import translate from "translate";
import { fetchSearchQuotes } from '../services/apiService';

export default {
  name: 'SearchAuthors',
  setup() {
    const limit = ref(10); // Valor padrão para limit
    const query = ref(''); // valor da consulta
    const filterResponse = ref([]); // Variável para armazenar os resultados filtrados
    const showResult = ref(false); // Variável para controlar a exibição do resultado

    // Função para pesquisar autores
    const search = async () => {
      try {
        // Traduz o valor do campo de consulta para inglês
        const translatedQuery = await translate(query.value, { to: 'en' });

        const response = await fetchSearchQuotes({ query: translatedQuery, limit: limit });

        console.log(response);

        // Filtra a resposta para manter apenas 'bio', 'description', 'name' e 'link'
        filterResponse.value = response.results.map(item => {
          return {
            author: item.author,
            content: item.content
          };
        });

        console.log(filterResponse.value);
        // Define showResult como true para exibir os resultados
        showResult.value = true;

      } catch (error) {
        console.error('Erro ao buscar autores:', error);
      }
    };

    return {
      limit,
      query,
      filterResponse,
      showResult,
      search
    };
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
</style>
