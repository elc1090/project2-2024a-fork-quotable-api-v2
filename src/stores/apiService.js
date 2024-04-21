import axios from 'axios';

const API_URL = 'https://api.quotable.io';


// Função para buscar citações aleatórias - Todos os parametros sao opcionais
export async function fetchRandomQuotes({limit, maxLength, minLength, tags, author} = {}) {
    const validLimit = limit >= 1 && limit <= 50 ? limit : 1; //Min: 1   Max: 10   Default: 1

    const params = {
        limit: validLimit, //int
    };

    if (maxLength) {
        params.maxLength = maxLength; //int
    }

    if (minLength) {
        params.minLength = minLength; //int
    }

    if (tags) {
        params.tags = tags; //string
    }

    if (author) {
        params.author = author; //string
    }

    try {
        const response = await axios.get(`${API_URL}/quotes/random`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching random quotes:', error);
        throw error;
    }
}

// Função para buscar lista citações aleatórias - Todos os parametros sao opcionais
export async function fetchRandomListQuotes({maxLength, minLength, tags, author, sortBy, order, limit, page} = {}) {
    const validLimit = limit >= 1 && limit <= 150 ? limit : 20; //Min: 1   Max: 150   Default: 20
    const validPage = page >= 1 ? page: 1;

    const params = {
      limit: validLimit, //int
      page: validPage,     //int
    };

    if (maxLength) {
        params.maxLength = maxLength; //int
    }

    if(minLength) {
        params.minLength = minLength; //int
    }

    if (tags) {
        params.tags = tags; //string
    }

    if (author) {
        params.author = author; //string
    }

    if (sortBy) {
        params.sortBy = sortBy; //enum
    }

    if (order) {
        params.order = order; //enum
    }
  
    try {
      const response = await axios.get(`${API_URL}/quotes`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching random quotes list:', error);
      throw error;
    }
  }

// Função para buscar citações por autor - o slug é obrigatório, os demais são opcionais
export async function fetchQuotesByAuthor({slug, sortBy, order, limit, page} = {}) {
    const validLimit = limit >= 1 && limit <= 150 ? limit : 20; //Min: 1   Max: 150   Default: 20
    const validPage = page >= 1 ? page: 1;

    const params = {
      limit: validLimit, //int
      page: validPage, //int
    };

    if (slug) { 
        params.slug = slug; //string
    }

    if (sortBy) {
        params.sortBy = sortBy; //enum
    }

    if (order) {
        params.oder = order; //enum
    }

    try {
        const response = await axios.get(`${API_URL}/authors`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching quotes by author:', error);
        throw error;
    }
}

// Função para buscar citacoes atraves de pesquisa do usuario
export async function fetchSearchQuotes({query, fields, fuzzyMaxEdits, fuzzyMaxExpansions, limit, page} = {}) {
    const validFields = fields || "content,author,tags";
    const validFuzzyMaxEdits = fuzzyMaxEdits >= 0 && fuzzyMaxEdits <= 2 ? fuzzyMaxEdits : 0; //Min: 0   Max: 2   Default: 0
    const validFuzzyMaxExpansions = fuzzyMaxExpansions >= 0 && fuzzyMaxExpansions <= 150 ? fuzzyMaxExpansions : 50; //Min: 0   Max: 150   Default: 50
    const validLimit = limit >= 0 && limit <= 150 ? limit : 20; //Min: 0   Max: 150   Default: 20
    const validPage = page >= 1 ? page: 1;

    const params = {
      fields: validFields, //string
      fuzzyMaxEdits: validFuzzyMaxEdits, //int
      fuzzyMaxExpansions: validFuzzyMaxExpansions, //int
      limit: validLimit, //int
      page: validPage, //int
    };

    if (query) {
        params.query = query; //string
    }

    try {
        const response = await axios.get(`${API_URL}/search/quotes`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching quotes by search:', error);
        throw error;
    }
}


// Função para buscar autores atraves de pesquisa do usuario
export async function fetchSearchAuthors(query, autocomplete, matchTreshold, limit, page) {
    
    const validMatchTreshold = matchTreshold >= 1 && matchTreshold <= 3 ? matchTreshold : 2; //Min: 1   Max: 3   Default: 2
    const validLimit = limit >= 0 && limit <= 150 ? limit : 20; //Min: 0   Max: 150   Default: 20
    const validPage = page >= 1 ? page: 1;

    const params = {
      query,
      autocomplete,
      matchTreshold: validMatchTreshold,
      limit: validLimit,
      page: validPage,
    };

    try {
        const response = await axios.get(`${API_URL}/search/authors`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching authors by search:', error);
        throw error;
    }
}
