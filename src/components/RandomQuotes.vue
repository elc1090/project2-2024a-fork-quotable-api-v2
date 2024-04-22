<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-xl-6">
        <div class="text-center mb-3"> <!-- Adicionando classe text-center para centralizar o conteúdo -->
          <div class="input-group">
            <label for="query" class="input-group-text">Consulta:</label>
            <input type="text" id="query" class="form-control rounded-pill" v-model="query">
          </div>
          <button @click="search" class="btn btn-primary rounded-pill btn-sm w-25" :class="{ 'btn-loading': loading }">
            <span v-if="!loading">Pesquisar</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Pesquisando...
            </span>
          </button>
        </div>

        <div v-if="showResult" class="mt-3">
          <div class="row">
            <div v-for="(item, index) in filterResponse" :key="index" class="col-md-6 mb-3">
              <div class="card">
                <div class="card-body">
                  <p class="card-text"><strong>Author:</strong> {{ item.author }}</p>
                  <p class="card-text"><strong>Content:</strong> {{ item.content }}</p>
                  <button @click="copyToClipboard(item)" class="btn btn-outline-secondary btn-sm float-end">
                    <i class="fas fa-copy"></i> Copiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    const loading = ref(false); // Variável para controlar a exibição do spinner de carregamento

    // Função para pesquisar autores
    const search = async () => {
      try {
        // Define loading como true para mostrar o spinner de carregamento
        loading.value = true;

        // Traduz o valor do campo de consulta para inglês
        const translatedQuery = await translate(query.value, { to: 'en' });

        const response = await fetchSearchQuotes({ query: translatedQuery, limit: limit });

        // Filtra a resposta para manter apenas 'author' e 'content'
        filterResponse.value = response.results.map(item => {
          return {
            author: item.author,
            content: item.content
          };
        });

        // Define showResult como true para exibir os resultados
        showResult.value = true;

      } catch (error) {
        console.error('Erro ao buscar autores:', error);
      } finally {
        // Define loading como false para esconder o spinner de carregamento
        loading.value = false;
      }
    };

    // Função para copiar o texto completo (content + author) para a área de transferência
    const copyToClipboard = async (item) => {
      try {
        const textToCopy = `${item.content} - ${item.author}`; // Adicionando o nome do autor ao final da frase
        await navigator.clipboard.writeText(textToCopy);
        alert('Texto copiado para a área de transferência!');
      } catch (error) {
        console.error('Erro ao copiar texto:', error);
      }
    };

    return {
      limit,
      query,
      filterResponse,
      showResult,
      search,
      loading,
      copyToClipboard
    };
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
</style>
