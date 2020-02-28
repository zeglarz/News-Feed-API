const app = require('./app');
const news = require('./newsApi');

app.runServer(3000);
console.log(app);

console.log(news);
