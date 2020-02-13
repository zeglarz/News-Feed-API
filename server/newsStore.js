const newsApi = require('./newsApi');
const news = newsApi.getCryptoHeadlines('trump', 'politics', 'en', 'us');


const get = () => require(`./${PRODUCTS_FILE_NAME}`);

const getArticleById = (title) => news.then(response => res.json(response));

module.exports = { getArticleById };