# web-scrapper-api

## Scraper Endpoint
`domain.com/api/scraper`

## API Docs
`domain.com/api/docs`

## Techs
```
1. Koajs & koa-joi-router
2. Pouchdb
3. axios
4. cheerio
5. pino & morgan
```

## Installation
```
1. npm i
2. npm run start:prd
```

## With Docker
Build Image
`docker build -t <your docker id>/web-scrapper-api .`

Run Image with local port :9999
`docker run 9999:3000 -d <your docker id>/web-scrapper-api`

## Heroku
This application is hosted on Heroku domain `https://myweb-scraper-api.herokuapp.com`

## CORS
This application is allowing ingress traffic from http://localhost:4200 and https://product-showcase-ui.herokuapp.com

## Destroy PouchDB
`npm run db:destroy`