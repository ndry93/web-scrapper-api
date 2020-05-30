const app = require('./server/app');
const config = require('./src/config');

app.listen(config.PORT, () => console.log(`web-scrapper-api ${config.PORT}`));
