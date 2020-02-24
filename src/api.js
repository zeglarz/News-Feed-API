const HOST_URL = 'http://localhost:8080';

Api = {
    getNews: () => fetch(HOST_URL).then((response) => response.json()),
    getArticle: (title) => fetch(`${HOST_URL}/articles/${title}`).then((response) => response.json()),
    getNewsByCountry: (country) => fetch(`${HOST_URL}/country/${country}`).then((response) => response.json()),
    getNewsByCategory: (category) => fetch(`${HOST_URL}/category/${category}`).then((response) => response.json()),
    getNewsByQuery: (query) => fetch(`${HOST_URL}/query?q=${query}`).then((response) => response.json())
};

