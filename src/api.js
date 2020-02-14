Api = {
    getNews: () => fetch('http://localhost').then((response) => response.json()),
    getArticle: (title) => fetch(`http://localhost/articles/${title}`).then((response) => response.json()),
    getNewsByCountry: (country) => fetch(`http://localhost/country/${country}`).then((response) => response.json()),
    getNewsByCategory: (category) => fetch(`http://localhost/category/${category}`).then((response) => response.json()),
    getNewsByQuery: () => fetch('http://localhost/query').then((response) => response.json())


};

