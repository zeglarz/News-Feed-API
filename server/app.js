const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const newsApi = require('./newsApi');
const _ = require('lodash');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const newsStore = require('./newsStore');

let obj = {
    q: '',
    category: '',
    language: '',
    country: 'us'
};
const getNews = async (obj) => await newsApi.getCryptoHeadlines(obj);


app.get('/', (req, res) => {
    obj = {
        q: '',
        category: '',
        language: '',
        country: 'us'
    };
    getNews(obj)
        .then(data => {
            let cleanedData = data.articles.map((article) => {
                if (article.urlToImage === null) {
                    article.urlToImage = 'https://drogariaguarulhos.com.br/media/catalog/product/placeholder/default/notfound.png';
                }
                return article;
            });
            res.json(cleanedData);
        });
});

app.get('/articles/:title', (req, res) => {
    getNews(obj)
        .then(data => {
            let news = data.articles.find((article) => article.title.split('\'').join('') === decodeURIComponent(req.params.title));
            console.log(req.params.title);
            res.json(news);
        })
        .catch(err => console.log(err));

});

app.get('/country/:country', (req, res) => {
    let buttonPressed = req.params.country;
    obj.language = buttonPressed;
    obj.country = buttonPressed;
    getNews(obj).then(response => res.json(response.articles));
});


app.get('/category/:category', (req, res) => {
    let buttonPressed = '';
    if (req.params.category === 'All') {
        buttonPressed = '';
    } else {
        buttonPressed = req.params.category.toLocaleLowerCase();
    }
    obj.category = buttonPressed;
    getNews(obj).then(response => res.json(response.articles));
});

app.get('/query', (req, res) => {
    let query = req.query.q.toLowerCase();
    obj.q = query.toLowerCase();
    console.log(query);
    getNews(obj)
        .then(data => {
            let searchedArticle = data.articles.filter(r => {
                if (r.title !== null || '') return r.title.toLowerCase().includes(query);
                return false;
            });
            return res.json(searchedArticle);
        });
});


// app.get('/query', (req, res) => {
//
// });


const runServer = (port) => {
    console.log(`Server is running on port ${port}`);
    app.listen(port);

};

module.exports = {runServer, getNews}; //strukturyzacja, czyli przeciwieństwo destrukturyzacji

