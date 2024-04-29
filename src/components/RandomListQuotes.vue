<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-xl-6">
        <div class="row text-center mb-3">
          <div class="col-6">
            <div class="form-floating mb-3 row">
              <select class="form-control" multiple aria-label="multiple select example"
                      id="tags" v-model="inputTags" @change="selection" style="height: 150px">
                <option v-for="(tag, i) in tags" :key="i" class="col-md-6 mb-3">{{ tag }}</option>
              </select>
              <label for="tags">Tags:</label>
            </div>
            <div v-if="showTags" class="">
              Tags selecionadas:
              <span v-for="(selected, index) in selectedTags" :key="index" style="">
                  {{ selected }},
                </span>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <div class="form-floating mb-3">
                <input type="text" id="author" class="form-control" v-model="author">
                <label for="author">Autor:</label>
              </div>
            </div>
            <div class="row">
              <div class="form-floating mb-3">
                <input type="number" id="limit" class="form-control" v-model.number="limit">
                <label for="limit">Limite:</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col text-center">

              <button @click="search" class="btn btn-primary btn-sm w-25" :class="{ 'btn-loading': loading }">
                <span v-if="!loading">Pesquisar</span>
                <span v-else>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Pesquisando...
            </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mostra os resultados filtrados -->
        <div v-if="showResult" class="mt-3">
          <div class="row">
            <div v-for="(quote, index) in filterResponse" :key="index" class="col-md-6 mb-3">
              <div :class="{ 'card': true, 'text-center': shouldCenter(index) }">
                <div class="card-body">
                  <p class="card-text">"{{ quote.content }}"</p>
                  <p class="card-text"><strong>{{ quote.author }}</strong></p>
                  <span class="badge rounded-pill text-bg-primary m-2" v-for="(tag, i) in quote.tags" :key="i">
                    {{ tag }}
                  </span>
                  <div class="text-center">
                    <button @click="shareOnWhatsApp(quote)" class="btn btn-outline-success btn-sm">
                      <i class="fab fa-whatsapp"></i>
                    </button>
                    <button @click="shareOnX(quote)" class="btn btn-outline-primary btn-sm">
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button @click="copyToClipboard(quote)" class="btn btn-outline-secondary btn-sm">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
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
import { ref } from 'vue'
import translate from 'translate'
import { fetchRandomListQuotes } from '@/services/apiService'

export default {
  name: 'RandomListQuotes',
  props: ['tags'],

  setup() {
    const selectedTags = ref([])
    const showTags = ref(false)
    const inputTags = ref('')
    const author = ref('')
    const limit = ref(5)
    const filterResponse = ref([])
    const showResult = ref(false)
    const loading = ref(false)

    const search = async () => {
      try {
        loading.value = true
        const response = await fetchRandomListQuotes({
          limit: limit.value,
          tags: inputTags.value,
          author: author.value
        })

        filterResponse.value = await Promise.all(response.results.map(async item => {
          const content = await translate(item.content, { from: 'en', to: 'pt' })
          const author = item.author
          const tags = []
          item.tags.map(async tag => {
            await translate(tag, { from: 'en', to: 'pt' }).then(res => {
              if (res !== 'undefined') tags.push(res)
            })
          })
          return { content, author, tags }
        }))
        showResult.value = true
      } catch (error) {
        console.error('Erro ao buscar citações:', error)
      } finally {
        loading.value = false
      }
    }

    const copyToClipboard = async (quote) => {
      try {
        const textToCopy = `${quote.content} - ${quote.author}` // Adicionando o nome do autor ao final da frase
        await navigator.clipboard.writeText(textToCopy)
        alert('Texto copiado para a área de transferência!')
      } catch (error) {
        console.error('Erro ao copiar texto:', error)
      }
    }

    const shareOnWhatsApp = async (quote) => {
      try {
        const text = encodeURIComponent(`${quote.content} - ${quote.author}`)
        const url = `https://api.whatsapp.com/send?text=${text}`
        window.open(url, 'Compartilhar no WhatsApp', 'width=600,height=400')
      } catch (error) {
        console.error('Erro ao compartilhar via WhatsApp:', error)
      }
    }

    const shareOnX = async (quote) => {
      try {
        const text = encodeURIComponent(`${quote.content} - ${quote.author}`)
        const url = `https://x.com/intent/tweet?text=${text}`
        window.open(url, 'Compartilhar no X', 'width=600,height=400')
      } catch (error) {
        console.error('Erro ao compartilhar via X:', error)
      }
    }

    const shouldCenter = (index) => {
      const center = filterResponse.value.length % 2 !== 0 && (filterResponse.value.length === 1 || index === filterResponse.value.length - 1)
      return center
    }

    const selection = () => {
      selectedTags.value = inputTags.value
      if (inputTags.value.length > 0) {
        showTags.value = true
      } else {
        showTags.value = false
      }
    }

    // Retorna as variáveis e a função para o template
    return {
      selectedTags,
      showTags,
      inputTags,
      author,
      limit,
      filterResponse,
      showResult,
      search,
      loading,
      copyToClipboard,
      shouldCenter,
      shareOnWhatsApp,
      shareOnX,
      selection
    }
  }
}
</script>

<style scoped>
</style>
