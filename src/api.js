const HOST_URL = 'paste_your_backend_URL_hee';

Api = {
    getNews: (country, category, query) => fetch(`${HOST_URL}?q=${query}&country=${country}&category=${category}`).then((response) => response.json())
};

