const HOST_URL = '...';

const Api = {
    getNews: (country, category, query) => fetch(`${HOST_URL}?q=${query}&country=${country}&category=${category}`)
        .then(response => response.json())
};
