const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const Image = require('./Image');

class Database extends EventEmitter {
  constructor() {
    super();

    this.files = {};
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.files === 'object') {
      this.files = {};

      for (let id in dump.files) {
        const image = dump.files[id];

        this.files[id] = new Image(image);
      }
    }
  }

  async insert(image) {
    await image.saveOriginal(image.buffer);

    this.files[image.id] = image.toJSON();

    this.emit('changed');
  }

  async remove(imageId) {
    const imageRaw = this.files[imageId];

    if (!imageRaw) return '';

    const image = new Image(imageRaw);

    await image.removeOriginal();

    delete this.files[imageId];

    this.emit('changed');

    return imageId;
  }

  findOne(imageId) {
    const imageRaw = this.files[imageId];

    if (!imageRaw) {
      return null;
    }

    const image = new Image(imageRaw);

    return image;
  }

  find() {
    let allImages = Object.values(this.files);

    allImages.sort((imageA, imageB) => imageB.uploadedAt - imageA.uploadedAt);

    return allImages;
  }

  toJSON() {
    return {
      files: this.files,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
