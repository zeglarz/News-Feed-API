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


// app.get('/', (req, res) => {
//     obj = {
//         q: '',
//         category: '',
//         language: '',
//         country: 'us'
//     };
//     getNews(obj)
//         .then(data => {
//             let cleanedData = data.articles.map((article) => {
//                 if (article.urlToImage === null) {
//                     article.urlToImage = 'https://drogariaguarulhos.com.br/media/catalog/product/placeholder/default/notfound.png';
//                 }
//                 return article;
//             });
//             res.json(cleanedData);
//         });
// });

app.get('/articles/:title', (req, res) => {
    getNews(obj)
        .then(data => {
            let news = data.articles.find((article) => article.title.split('\'').join('') === decodeURIComponent(req.params.title));
            res.json(news);
        })
        .catch(err => console.log(err));

});

app.get('/', (req, res) => {
    let obj = {
        q: '',
        category: '',
        language: '',
        country: ''
    };
    console.log(req.query.country);
    obj.language = req.query.country === undefined ? 'us' : req.query.country;
    obj.country = req.query.country === undefined ? 'us' : req.query.country;
    obj.category = req.query.category;
    obj.q = req.query.q;
    getNews(obj).then(response => res.json(response.articles));
});


app.get('/country', (req, res) => {
    let buttonPressed = '';
    if (req.params.category === 'All') {
        buttonPressed = '';
    } else {
        buttonPressed = req.query.category.toLocaleLowerCase();
    }
    obj.category = buttonPressed;
    getNews(obj).then(response => res.json(response.articles));
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
    console.log(obj);
    getNews(obj)
        .then(data => {
            let searchedTitle = data.articles.filter(r => {
                if (r.title !== null || '') return r.title.toLowerCase().includes(query);
                return false;
            });
            console.log('searched Title ' + searchedTitle);

            let searchedDescription = data.articles.filter(r => {
                if (r.description !== null || '') return r.description.toLowerCase().includes(query);
                return false;
            });
            console.log('searched description ' + searchedDescription);
            let concat = searchedTitle.concat(searchedDescription);
            let set = new Set(concat);
            let joinedResponse = [...set];


            return res.json(joinedResponse);
        });
});

// var newArray = homes.filter(function (el) {
//     return el.price <= 1000 &&
//         el.sqft >= 500 &&
//         el.num_of_beds >=2 &&
//         el.num_of_baths >= 2.5;
// });

// app.get('/query', (req, res) => {
//
// });


const runServer = (port) => {
    console.log(`Server is running on port ${port}`);
    app.listen(port);

};

module.exports = { runServer, getNews }; //strukturyzacja, czyli przeciwieństwo destrukturyzacji

