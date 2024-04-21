<template>
    <div>The Welcome</div>
    <div>
        <button @click="shareOnInstagram">Compartilhar no Instagram</button>
        <button @click="shareOnX">Compartilhar no X</button>
        <button @click="shareOnFacebook">Compartilhar no Facebook</button>
        <button @click="shareOnWhatsApp">Compartilhar no WhatsApp</button>
        
    </div>  
    </template>
    <script setup>
        import translate from "translate";
        import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from '../services/apiService.js';
        
        
        async function shareOnX() {
            const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
            const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
            var text = encodeURIComponent(resultadoTraducao);
    
            window.open('https://x.com/intent/tweet?text=' + text, 'Compartilhar no X', 'width=600,height=400');
        }
    
        function shareOnInstagram() {
          
        }
        
        async function shareOnFacebook() {
        /*    const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
            const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
            const text = encodeURIComponent(resultadoTraducao)
            const url = "https://www.facebook.com/dialog/feed?app_id=145634995501895" +
                        "&display=" + encodeURIComponent("popup") +
                        "&link=" + encodeURIComponent("https://www.google.com") + 
                        "&description=" + text;
    
            FB.ui(
            {
                method: 'share',
                href: 'google.com',     // The same than link in feed method
                title: 'your_title',  // The same than name in feed method
                description: 'your_description',
            },
            function(response){
                // your code to manage the response
            });
    
            // Abre uma nova janela para compartilhamento no Facebook com o texto pré-preenchido
            window.open(url,'Compartilhar no Facebook', 'width=600,height=400');
         */ 
        }
    
        async function shareOnWhatsApp() {
            const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
            const resultadoTraducao = await translate(resultado.results[0].bio, "pt");
            var text = encodeURIComponent(resultadoTraducao);
            const url = "https://api.whatsapp.com/send?text=" + text;
    
            window.open(url, 'Compartilhar no WhatsApp', 'width=600,height=400');
        }
    </script>