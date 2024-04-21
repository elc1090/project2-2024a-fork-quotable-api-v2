<template>
  <div>RandomQuotes</div>
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
    <script setup>
    // import { ref } from 'vue';
    // import translate from "translate";
    // import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from '../services/apiService.js';
        
        
    //     const pesquisa = ref(''); // Variável reativa para armazenar o valor do input

        

    //     async function shareOnX() {

    //         const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
    //         const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
    //         var text = encodeURIComponent(resultadoTraducao);
    
    //         window.open('https://x.com/intent/tweet?text=' + text, 'Compartilhar no X', 'width=600,height=400');
    //     }
    
    //     async function shareOnInstagram() {
          
    //     }
        
    //     async function shareOnFacebook() {
    //     /*    const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
    //         const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
    //         const text = encodeURIComponent(resultadoTraducao)
    //         const url = "https://www.facebook.com/dialog/feed?app_id=145634995501895" +
    //                     "&display=" + encodeURIComponent("popup") +
    //                     "&link=" + encodeURIComponent("https://www.google.com") + 
    //                     "&description=" + text;
    
    //         FB.ui(
    //         {
    //             method: 'share',
    //             href: 'google.com',     // The same than link in feed method
    //             title: 'your_title',  // The same than name in feed method
    //             description: 'your_description',
    //         },
    //         function(response){
    //             // your code to manage the response
    //         });
    
    //         // Abre uma nova janela para compartilhamento no Facebook com o texto pré-preenchido
    //         window.open(url,'Compartilhar no Facebook', 'width=600,height=400');
    //      */ 
    //     }
    
    //     async function shareOnWhatsApp() {
    //         const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
    //         const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
    //         var text = encodeURIComponent(resultadoTraducao);
    //         const url = "https://api.whatsapp.com/send?text=" + text;
    
    //         window.open(url, 'Compartilhar no WhatsApp', 'width=600,height=400');
    //     }
    </script>