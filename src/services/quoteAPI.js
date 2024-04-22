//import { fetchQuotesByAuthor } from '@/services/apiService';
import translate from "translate";
import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from './apiService.js';

translate.engine = "google"; // "google", "yandex", "libre", "deepl"
translate.key = process.env.DEEPL_KEY;

async function exemploFetchQuotesByAuthor() {
  try {
    const text = await translate("tecnologia", { from: "pt", to: "en" });
    
    console.log(text);
    const resultado = await fetchRandomListQuotes({ tags: "amor ou felicidade"});
    //const text = await translate(resultado.data, "pt");
    console.log(resultado);
  } catch (error) {
    console.error('Erro ao buscar citações por autor:', error);
  }
}

exemploFetchQuotesByAuthor();