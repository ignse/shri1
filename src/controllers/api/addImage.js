const db = require('../../entities/Database');
const Image = require('../../entities/Image');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res) => {
  const { file } = req;

  if (!file || file.mimetype !== 'image/jpeg') {
    new BadRequestApiError().sendResponse(res);
  }

  const imageFile = new Image(file);

  await db.insert(imageFile);

  return res.json(imageFile.toPublicJSON());
};
