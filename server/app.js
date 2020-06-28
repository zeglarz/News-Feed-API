const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const newsApi = require('./newsApi');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const getNews = async (obj) => await newsApi.getCryptoHeadlines(obj);

app.get('/', (req, res) => {

    let obj = {
        q: '',
        category: '',
        language: '',
        country: ''
    };

    obj.language = req.query.country === undefined ? 'us' : req.query.country;
    obj.country = req.query.country === undefined ? 'us' : req.query.country;
    obj.category = req.query.category;
    obj.q = req.query.q;

    getNews(obj)
        .then(data => {
            let cleanedData = data.articles.map((article) => {
                if (article.urlToImage === null) {
                    article.urlToImage = 'https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg';
                }
                if (article.description === null || !article.description || article.description === '') {
                    article.description = 'Click and see more';
                }
                return article;
            });
            res.json(cleanedData);
        });
});

app.get('/query', (req, res) => {
    let obj = {
        q: '',
        category: '',
        language: '',
        country: ''
    };
    let query = req.query.q === undefined ? '' : req.query.q.toLowerCase();
    obj.language = req.query.country === undefined ? 'us' : req.query.country;
    obj.country = req.query.country === undefined ? 'us' : req.query.country;
    obj.category = req.query.category === undefined ? '' : req.query.category;
    obj.q = query;

    getNews(obj)
        .then(data => {
            let searchedTitle = data.articles.filter(r => {
                if (r.title !== null || '') return r.title.toLowerCase().includes(query);
                return false;
            });

            let searchedDescription = data.articles.filter(r => {
                if (r.description !== null || '') return r.description.toLowerCase().includes(query);
                return false;
            });
            let concat = searchedTitle.concat(searchedDescription);
            let set = new Set(concat);
            let joinedResponse = [...set];

            return res.json(joinedResponse);
        });
});

const runServer = (port) => {
    console.log(`Server is running on port ${port}`);
    app.listen(port);
};

module.exports = { runServer, getNews };

