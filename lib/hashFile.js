const crypto = require('crypto');
const fs = require('fs');

module.exports = function hashFile(filename) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');

    const input = fs.createReadStream(filename);
    input.on('error', reject);
    input.on('data', (data) => {
      hash.update(data);
    });
    input.on('end', () => {
      resolve(hash.digest('hex'));
    });
  });
};
