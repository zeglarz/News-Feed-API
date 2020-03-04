const HOST_URL = 'http://localhost:3000';

Api = {
    getNews: (country, category, query) => fetch(`${HOST_URL}?q=${query}&country=${country}&category=${category}`).then((response) => response.json())
};

