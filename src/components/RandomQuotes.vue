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
  </div>
<!-- <div class="d-flex justify-content-center mt-5">
    <div class="input-group" style="max-width: 400px;">
      <input v-model="pesquisa" type="text" class="form-control rounded-pill" placeholder="Buscar por autor, palavra-chave ..." aria-label="Pesquisar" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="shareOnWhatsApp">
        <i class="bi bi-search"></i>
      </button>
    </div>
</div> -->
    <!-- <div>
        <button @click="shareOnInstagram">Compartilhar no Instagram</button>
        <button @click="shareOnX">Compartilhar no X</button>
        <button @click="shareOnFacebook">Compartilhar no Facebook</button>
        <button @click="shareOnWhatsApp">Compartilhar no WhatsApp</button>
        
    </div>   -->

  </template>

<script>
import { ref } from 'vue';
import translate from "translate";

  export default {
    name: 'RandomQuotes',

    setup() {
      // Variáveis para armazenar os valores dos campos
      const tags = ref('');
      const author = ref('');
      const limit = ref(10); // Valor padrão para limit

      // Variável para armazenar o resultado da pesquisa
      const quotes = ref([]);

      // Variável para controlar a exibição do resultado
      const showResult = ref(false);

      // Função para traduzir os rótulos dos campos
      const translatedTagsLabel = translate('tagsLabel', { to: 'en' });
      const translatedAuthorLabel = translate('authorLabel', { to: 'en' });
      const translatedLimitLabel = translate('limitLabel', { to: 'en' });
      const translatedSearchButton = translate('searchButton', { to: 'en' });

      // Função para pesquisar citações
      const searchQuotes = async () => {
        try {
          // Traduz o valor do campo de tags para inglês
          const translatedTags = await translate(tags.value, { to: 'en' });

          // Chama a função fetchRandomListQuotes com os parâmetros informados
          const response = await fetchRandomListQuotes({
            tags: translatedTags,
            author: author.value,
            limit: limit.value
          });

          // Atualiza o array de citações com o resultado da pesquisa
          quotes.value = response.results;

          // Define showResult como true para exibir o resultado na tela
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
        showResult,
        translatedTagsLabel,
        translatedAuthorLabel,
        translatedLimitLabel,
        translatedSearchButton,
        searchQuotes
      };
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 1rem; /* Espaçamento entre os grupos de entrada */
}
</style>