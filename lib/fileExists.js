const fs = require('fs');

/**
 * Check to see if a filename exists and resolve to a boolean
 * @param   {String} filename
 * @returns {Promise}
 */
module.exports = function fileExists(filename) {
  return new Promise((resolve) => {
    fs.access(filename, 'r', (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
