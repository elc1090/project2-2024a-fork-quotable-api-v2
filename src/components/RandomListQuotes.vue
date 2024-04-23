<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-xl-6">
        <div class="text-center mb-3"> <!-- Adicionando classe text-center para centralizar o conteúdo -->
          <div class="input-group mb-3">
            <label for="tags" class="input-group-text">Tags:</label>
            <input type="text" id="tags" class="form-control rounded-pill" v-model="tags">
          </div>
          <div class="input-group mb-3">
            <label for="author" class="input-group-text">Autor:</label>
            <input type="text" id="author" class="form-control rounded-pill" v-model="author">
          </div>
          <div class="input-group mb-3">
            <label for="limit" class="input-group-text">Limite:</label>
            <input type="number" id="limit" class="form-control rounded-pill" v-model.number="limit">
          </div>
          <button @click="search" class="btn btn-primary rounded-pill btn-sm w-25" :class="{ 'btn-loading': loading }">
            <span v-if="!loading">Pesquisar</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Pesquisando...
            </span>
          </button>
        </div>

        <!-- Mostra os resultados filtrados -->
        <div v-if="showResult" class="mt-3">
          <div class="row">
            <div v-for="(quote, index) in filterResponse" :key="index" class="col-md-6 mb-3">
              <div class="card">
                <div class="card-body">
                  <p class="card-text"><strong>Conteúdo:</strong> {{ quote.content }}</p>
                  <p class="card-text"><strong>Autor:</strong> {{ quote.author }}</p>
                  <button @click="copyToClipboard(quote)" class="btn btn-outline-secondary btn-sm float-end">
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
import translate from 'translate';
import { fetchRandomListQuotes } from '@/services/apiService';

export default {
  name: 'RandomListQuotes',

  setup() {
    // Variáveis para armazenar os valores dos campos
    const tags = ref('');
    const author = ref('');
    const limit = ref(5); // Valor padrão para limit

    // Variável para armazenar os resultados filtrados
    const filterResponse = ref([]);

    // Variável para controlar a exibição do resultado
    const showResult = ref(false);

    // Variável para controlar a exibição do spinner de carregamento
    const loading = ref(false);

    // Função para pesquisar citações
    const search = async () => {
      try {
        // Define loading como true para mostrar o spinner de carregamento
        loading.value = true;

        const response = await fetchRandomListQuotes({ limit: limit.value, tags: tags.value, author: author.value });

        // Traduz as frases para o português
        filterResponse.value = await Promise.all(response.results.map(async item => {
          const content = await translate(item.content, { from: 'en', to: 'pt' });
          const author = await translate(item.author, { from: 'en', to: 'pt' });
          return { content, author };
        }));

        // Define showResult como true para exibir os resultados
        showResult.value = true;

      } catch (error) {
        console.error('Erro ao buscar citações:', error);
      } finally {
        // Define loading como false para esconder o spinner de carregamento
        loading.value = false;
      }
    };

    // Função para copiar o texto completo (content + author) para a área de transferência
    const copyToClipboard = async (quote) => {
      try {
        const textToCopy = `${quote.content} - ${quote.author}`; // Adicionando o nome do autor ao final da frase
        await navigator.clipboard.writeText(textToCopy);
        alert('Texto copiado para a área de transferência!');
      } catch (error) {
        console.error('Erro ao copiar texto:', error);
      }
    };

    // Retorna as variáveis e a função para o template
    return {
      tags,
      author,
      limit,
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
