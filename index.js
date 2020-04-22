const { downloadImage, resize, saveToS3 } = require('./utils');

const bucket = 'lambda-images-bucket';

exports.handler = async (event) => {
  const buf = await downloadImage(event.url);
  const resized = await resize(buf, 100, 100);
  const key = await saveToS3(bucket, event.name, resized);
  return { key };
};