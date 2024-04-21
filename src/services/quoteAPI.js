//import { fetchQuotesByAuthor } from '@/services/apiService';
import translate from "translate";
import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from './apiService.js';

translate.engine = "google"; // "google", "yandex", "libre", "deepl"
translate.key = process.env.DEEPL_KEY;

async function exemploFetchQuotesByAuthor() {
  try {
    const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
    const text = await translate(resultado.results[0].bio, "pt");
    console.log(text);
  } catch (error) {
    console.error('Erro ao buscar citações por autor:', error);
  }
}

exemploFetchQuotesByAuthor();