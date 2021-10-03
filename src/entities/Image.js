const path = require('path');

const { imgFolder } = require('../config');
const { writeFile, removeFile } = require('../utils/fs');
const { generateId } = require('../utils/generateId');

module.exports = class Image {
  constructor(imgFile) {
    this.id = imgFile.id || generateId();
    this.uploadedAt = imgFile.uploadedAt || Date.now();
    this.buffer = imgFile.buffer;
    this.size = imgFile.size;
    this.mimetype = imgFile.mimetype;

    this.originalFilename = `${this.id}.jpeg`;
  }

  async saveOriginal(content) {
    await writeFile(this.getFullPath(), content);
  }

  async removeOriginal() {
    await removeFile(this.getFullPath());
  }

  getFullPath() {
    return path.resolve(imgFolder, this.originalFilename);
  }

  toPublicJSON() {
    return {
      id: this.id,
      uploadedAt: this.uploadedAt,
      size: this.size,
      body: this.buffer,
      mimeType: this.mimetype,
    };
  }

  toJSON() {
    return {
      id: this.id,
      uploadedAt: this.uploadedAt,
      size: this.size,
      buffer: this.buffer,
      mimetype: this.mimetype,
    };
  }
};
