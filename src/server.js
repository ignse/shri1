const http = require('http');
const express = require('express');
const multer = require('multer');
const upload = multer();
const { PORT } = require('./config');
const { apiRouter } = require('./routers');
const { NotFoundApiError } = require('./validators/errors/ApiError');

const app = express();
app.use(upload.single('image'));

// api routes
app.use('/', apiRouter);

// 404 for all other requests
app.use((error, res) => {
  new NotFoundApiError().sendResponse(res);
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
