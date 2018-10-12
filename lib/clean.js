const rimraf = require('rimraf');

/**
 * Clean a folder, aka, rm -rf
 * @param   {String} filename
 * @returns {Promise}
 */
module.exports = function clean(filename) {
  return new Promise((resolve, reject) => {
    rimraf(filename, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
