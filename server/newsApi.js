const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('paste your api key here');

// To query top headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them


const getCryptoHeadlines = (data) => newsapi.v2.topHeadlines(data);

module.exports = { getCryptoHeadlines };
