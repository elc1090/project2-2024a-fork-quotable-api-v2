//import { fetchQuotesByAuthor } from '@/services/apiService';
import translate from "translate";
import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from './apiService.js';

translate.engine = "google"; // "google", "yandex", "libre", "deepl"
translate.key = process.env.DEEPL_KEY;

async function exemploFetchQuotesByAuthor() {
  try {
    const text = await translate("tecnologia", "en");
    const resultado = await fetchRandomListQuotes({ tags: text});
    //const text = await translate(resultado.data, "pt");
    console.log(resultado);
  } catch (error) {
    console.error('Erro ao buscar citações por autor:', error);
  }
}

exemploFetchQuotesByAuthor();