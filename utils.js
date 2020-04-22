const GM = require('gm');
const gm = GM.subClass({ imageMagick: true });
const FileType = require('file-type');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const axios = require('axios');

exports.downloadImage = async (url) => {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(res.data, 'binary');
};

exports.resize = async (buf, width, height) => {
  return new Promise((resolve, reject) => {
    gm(buf).resize(width, height).noProfile().toBuffer((err, buffer) => err ? reject(err) : resolve(buffer));
  });
};

exports.saveToS3 = async (bucket, name, buf) => {
  const contentType = await FileType.fromBuffer(buf);
  const key = `${name}.${contentType.ext}`;
  await s3.putObject({
    Bucket: bucket,
    Key: key,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: contentType.mime,
  }).promise();
  return key;
};