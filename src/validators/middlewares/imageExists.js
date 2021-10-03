const db = require('../../entities/Database');
const { NotFoundApiError } = require('../../validators/errors/ApiError');

module.exports = (req, res, next) => {
  const imageId = req.params.id;

  if (db.findOne(imageId) === null) {
    new NotFoundApiError().sendResponse(res);
  } else next();
};
