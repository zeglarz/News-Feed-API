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
                    article.urlToImage = 'http://indyanin.myqnapcloud.com/imageNotFound2.png';
                }
                if (article.description === null || !article.description || article.description === '') {
                    article.description = 'Click and see more';
                }
                return article;
            });
            res.json(cleanedData);
        });
});


app.listen(process.env.PORT || port, function(response) {
  console.log("server is running on port " + port);
};

module.exports = { runServer, getNews };

