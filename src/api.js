const HOST_URL = 'http://localhost:3000';

Api = {
    getNews: (country, category, query) => fetch(`${HOST_URL}?q=${query}&country=${country}&category=${category}`).then((response) => response.json()),
    getArticle: (title) => fetch(`${HOST_URL}/articles/${title}`).then((response) => response.json()),
    getNewsByQuery: (query, country, category) => fetch(`${HOST_URL}/query?q=${query}&country=${country}&category=${category}`).then((response) => response.json())
};

