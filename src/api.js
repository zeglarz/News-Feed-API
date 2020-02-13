Api = {
    getNews: () => fetch("http://localhost").then((response) => response.json()),
    getArticle: (title) => fetch(`http://localhost/articles/${title}`).then((response) => response.json())
};

