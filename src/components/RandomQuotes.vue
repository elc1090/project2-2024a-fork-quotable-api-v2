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
    <button @click="search">Pesquisar</button>
    
    <!-- Mostra os resultados filtrados -->
    <div v-if="showResult">
      <div v-for="(quote, index) in filterResponse" :key="index">
        <p><strong>Content:</strong> {{ quote.content }}</p>
        <p><strong>Author:</strong> {{ quote.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import translate from "translate";
import { fetchRandomQuotes } from '@/services/apiService';

export default {
  name: 'RandomQuotes',

  setup() {
    // Variáveis para armazenar os valores dos campos
    const tags = ref('');
    const author = ref('');
    const limit = ref(10); // Valor padrão para limit

    // Variável para armazenar o resultado da pesquisa
    const quotes = ref([]);

    // Variável para armazenar os resultados filtrados
    const filterResponse = ref([]);

    // Variável para controlar a exibição do resultado
    const showResult = ref(false);

    // Função para pesquisar citações
    const search = async () => {
      try {
        // Traduz o valor do campo de tags para inglês
        const translatedTags = await translate(tags.value, { to: 'en' });

        const response = await fetchRandomQuotes({ limit: limit.value, tags: translatedTags, author: author.value });

        // Filtra a resposta para manter apenas 'author' e 'content'
        filterResponse.value = response.map(item => {
          return {
            author: item.author,
            content: item.content
          };
        });

        // Define showResult como true para exibir os resultados
        showResult.value = true;

      } catch (error) {
        console.error('Erro ao buscar citações:', error);
      }
    };

    // Retorna as variáveis e a função para o template
    return {
      tags,
      author,
      limit,
      quotes,
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