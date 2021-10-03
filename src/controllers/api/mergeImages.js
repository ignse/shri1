const db = require('../../entities/Database');
const Image = require('../../entities/Image');
const { BadRequestApiError } = require('../../validators/errors/ApiError');
const fs = require('fs');
const { replaceBackground } = require('backrem');

module.exports = async (req, res) => {
  if (!req.query.front || !req.query.back) {
    new BadRequestApiError().sendResponse(res);
  }

  const imgFrontRaw = db.findOne(req.query.front);
  const imgBackRaw = db.findOne(req.query.back);

  if (!imgFrontRaw || !imgBackRaw) {
    new BadRequestApiError().sendResponse(res);
  }

  const frontStream = fs.createReadStream(new Image(imgFrontRaw).getFullPath());
  const backStream = fs.createReadStream(new Image(imgBackRaw).getFullPath());

  const color = req.query.color ? req.query.color.split(',') : undefined;
  const threshold = req.query.threshold
    ? Number(req.query.threshold)
    : undefined;

  replaceBackground(frontStream, backStream, color, threshold)
    .then((readableStream) => {
      readableStream.pipe(res);
    })
    .catch(() => {
      new BadRequestApiError().sendResponse(res);
    });
};
