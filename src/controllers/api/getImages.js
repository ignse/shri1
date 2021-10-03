const db = require('../../entities/Database');
const Image = require('../../entities/Image');

module.exports = (req, res) => {
  const allImages = db.find().map((image) => new Image(image).toPublicJSON());

  return res.json(allImages);
};
