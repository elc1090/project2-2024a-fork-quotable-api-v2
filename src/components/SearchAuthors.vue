<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-xl-6">
        <div class="text-center mb-3">
          <div class="input-group mb-3">
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

        <!-- Mostrar resultados -->
        <div v-if="showResult" class="mt-3">
          <div class="row">
            <div v-for="(author, index) in filterResponse" :key="index" class="col-md-6 mb-3">
              <div class="card">
                <div class="card-body">
                  <p class="card-text"><strong>Nome:</strong> {{ author.name }}</p>
                  <p class="card-text"><strong>Biografia:</strong> {{ author.bio }}</p>
                  <p class="card-text"><strong>Descrição:</strong> {{ author.description }}</p>
                  <p class="card-text"><strong>Link:</strong> <a :href="author.link" target="_blank">{{ author.link }}</a></p>
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
import { fetchSearchAuthors } from '../services/apiService';

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

        const response = await fetchSearchAuthors({ query: translatedQuery, limit: limit });

        // Traduz as frases para o português
        filterResponse.value = await Promise.all(response.results.map(async item => {
          const name = await translate(item.name, { from: 'en', to: 'pt' });
          const bio = await translate(item.bio, { from: 'en', to: 'pt' });
          const description = await translate(item.description, { from: 'en', to: 'pt' });
          return { name, bio, description, link: item.link };
        }));

        // Define showResult como true para exibir os resultados
        showResult.value = true;

      } catch (error) {
        console.error('Erro ao buscar autores:', error);
      } finally {
        // Define loading como false para esconder o spinner de carregamento
        loading.value = false;
      }
    };

    return {
      limit,
      query,
      filterResponse,
      showResult,
      search,
      loading
    };
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}

.btn-loading {
  pointer-events: none; /* Desabilita a interação do botão durante o carregamento */
}
</style>
