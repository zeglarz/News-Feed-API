const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const newsApi = require('./newsApi');
const _ = require('lodash');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const newsStore = require('./newsStore');

let obj = {
    q: '',
    category: '',
    language: '',
    country: 'us'
};
const getNews = async (obj) => await newsApi.getCryptoHeadlines(obj);


app.get('/', (req, res) => {
 getNews(obj).then(response => res.json(response));
});

app.get('/articles/:title', (req, res) => {
getNews()
    .then(data => {
        let news = data.articles.find((article) => article.title.split("'").join("") === req.params.title);
        res.json(news)
    })
    .catch(err => console.log(err));

    });

app.post('/', (req, res) => {
    let buttonPressed = req.body.country;
    obj.language = buttonPressed;
    obj.country = buttonPressed;
    getNews(obj).then(response => res.json(response));
    console.log(buttonPressed)
});

const runServer = (port) => {
    console.log(`Server is running on port ${port}`);
    app.listen(port);

};

module.exports = {runServer, getNews }; //strukturyzacja, czyli przeciwieństwo destrukturyzacji

