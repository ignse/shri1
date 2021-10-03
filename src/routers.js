const express = require('express');
const imageExists = require('./validators/middlewares/imageExists');
const api = require('./controllers/api');

// routes for /api

const apiRouter = new express.Router();

apiRouter.get('/list', api.getImages);
apiRouter.get('/image/:id', imageExists, api.getImage);
apiRouter.post('/upload', api.addImage);
apiRouter.delete('/image/:id', api.deleteImage);
apiRouter.get('/merge', api.mergeImages);

exports.apiRouter = apiRouter;
