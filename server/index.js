const app = require('./app');
const news = require('./newsApi');

app.runServer(80);
console.log(app);

console.log(news);
