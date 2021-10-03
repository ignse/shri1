const db = require('../../entities/Database');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res) => {
  const imageId = req.params.id;

  const id = await db.remove(imageId);
  if (!id) {
    new BadRequestApiError().sendResponse(res);
  }

  return res.json({ id });
};
