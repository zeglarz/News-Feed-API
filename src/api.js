const HOST_URL = 'localhost:3000';

Api = {
    getNews: () => fetch(HOST_URL).then((response) => response.json()),
    getArticle: (title) => fetch(`${HOST_URL}/articles/${title}`).then((response) => response.json()),
    getNewsByCountry: (country) => fetch(`${HOST_URL}/country/${country}`).then((response) => response.json()),
    getNewsByCategory: (category) => fetch(`${HOST_URL}/category/${category}`).then((response) => response.json()),
    getNewsByQuery: () => fetch(`${HOST_URL}/query`).then((response) => response.json())


};

