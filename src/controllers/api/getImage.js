const db = require('../../entities/Database');
const Image = require('../../entities/Image');

module.exports = async (req, res) => {
  const imageId = req.params.id;

  const imgRaw = db.findOne(imageId);
  const img = new Image(imgRaw);

  res.type(img.mimetype).sendFile(img.getFullPath());
};
