<template>
  <div>
    <div class="input-group">
      <label for="query">Query:</label>
      <input type="text" id="query" v-model="query">
    </div>
    <button @click="search">Pesquisar</button>

    <!-- Mostrar resultados -->
    <div v-if="showResult">
      <div v-for="(author, index) in filterResponse" :key="index">
        <p><strong>Name:</strong> {{ author.name }}</p>
        <p><strong>Bio:</strong> {{ author.bio }}</p>
        <p><strong>Description:</strong> {{ author.description }}</p>
        <p><strong>Link:</strong> <a :href="author.link" target="_blank">{{ author.link }}</a></p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import translate from "translate";
import { fetchSearchAuthors } from '../services/apiService';

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

        const response = await fetchSearchAuthors({ query: translatedQuery, limit: limit });

        console.log(response);

        // Filtra a resposta para manter apenas 'bio', 'description', 'name' e 'link'
        filterResponse.value = response.results.map(item => {
          return {
            bio: item.bio,
            description: item.description,
            name: item.name,
            link: item.link
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