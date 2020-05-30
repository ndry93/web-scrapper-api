const app = require('./server/app');
const config = require('./src/config');

app.listen(config.PORT, () => console.log(`web-scraper-api ${config.PORT}`));
