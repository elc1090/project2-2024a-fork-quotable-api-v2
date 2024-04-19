//import { fetchQuotesByAuthor } from '@/services/apiService';
import { fetchRandomQuotes, fetchRandomListQuotes, fetchQuotesByAuthor, fetchSearchQuotes, fetchSearchAuthors } from './apiService.js';

async function exemploFetchQuotesByAuthor() {
  try {
    const resultado = await fetchQuotesByAuthor({ slug: 'albert-einstein' });
    console.log(resultado);
  } catch (error) {
    console.error('Erro ao buscar citações por autor:', error);
  }
}

exemploFetchQuotesByAuthor();