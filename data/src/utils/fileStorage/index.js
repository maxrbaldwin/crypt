const fs = require('fs');
const path = require('path');
const Storage = require('@google-cloud/storage');
const { logError, withErrorObject } = require('@logging');
const getTimeStamp = require('@utils/logging/getTimeStamp');

const projectId = 'data-digest-api';
 
const storage = new Storage({
  projectId,
});
 
const bucketName = 'congress-rss';
const tempStorage = path.join('./', 'temp');

const writeTempFile = (content, filePath) => {
  const parsedContent = String(content);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, parsedContent, err => {
      if (err) {
        logError(withErrorObject('write temp file error', err));
        reject();
      }
      resolve();
    });
  });
}

const deleteTempFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        logError(withErrorObject('delete temp file error', err));
        reject();
      }
      resolve();
    });
  });
}

module.exports.writeToStorage = (content, gcpDir, name, ext) => {
  return new Promise(async (resolve, reject) => {    
    try {
      const fileName = `${name || getTimeStamp()}.${ext || 'txt'}`;
      const gcpFilePath = `${gcpDir}/${fileName}`;
      const tempFilePath = path.join(__dirname, tempStorage, `${gcpDir}_${fileName}`);

      await writeTempFile(content, tempFilePath);

      storage
        .bucket(bucketName)
        .upload(tempFilePath, {
          destination: gcpFilePath,
          gzip: true,
          public: true,
        }, async (err, file, response) => {
          if (err) {
            await deleteTempFile(tempFilePath);
            logError(withErrorObject('GCP file upload error', err));
            reject();
          }
          await deleteTempFile(tempFilePath);
          resolve(response)
        })
    } catch(err) {
      reject(err);
    }
  });  
};