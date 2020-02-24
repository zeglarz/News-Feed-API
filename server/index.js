const app = require('./app');
const news = require('./newsApi');

app.runServer(8080);
console.log(app);

console.log(news);
