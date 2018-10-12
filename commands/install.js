#!/usr/bin/env node

/**
 * @file CLI wrapper for npm install that provides a caching layer for node_modules/
 */

// External
const tar = require('tar');
const path = require('path');
const os = require('os');

// Internal Libraries
const hashFile = require('../lib/hashFile');
const fileExists = require('../lib/fileExists');
const npmInstall = require('../lib/npmInstall');
const clean = require('../lib/clean');

// Helper function to get the current time in a consistent foramt
const getTime = () => new Date().toISOString();

module.exports = function commandInstall(config) {
  const startTime = process.hrtime();

  // Kick it off
  return Promise.resolve()
    .then(() => {
      if (config.clean) {
        // Sometime we need to do some cleaning to help with orphan files
        const folder = path.resolve('./node_modules');
        console.log(`[${getTime()}][INFO] Cleaning ${folder}`);
        return clean(folder);
      } else {
        return null;
      }
    })
    // Hash the package-lock.json which contains exact versions
    .then(() => hashFile('./package-lock.json'))
    .then((hash) => {
      const cachedFilename = path.join(config.cacheDirectory.replace('~', os.homedir()), `${hash}.tgz`);
      // Check to see if we already have a tarball
      return fileExists(cachedFilename)
        .then((exists) => {
          if (exists) {
            // If it exists then just extract it
            console.log(`[${getTime()}][INFO] No changes detected. Extracting from ${cachedFilename}`);
            return tar.extract({
              file: cachedFilename
            });
          } else {
            // If it doesn't exist then do a normal install
            return npmInstall(config)
              .then(() => {
                console.log(`[${getTime()}][INFO] Caching node_modules/ to to ${cachedFilename}`);
                return tar.create({
                  gzip: config.gzip,
                  file: cachedFilename
                }, ['./node_modules']);
              });
          }
        })
        .then(() => {
          // Keep track of the performance. Does this script actually help?
          const diff = process.hrtime(startTime);
          const duration = (diff[0] * 1000) + (diff[1] / 1000000);
          console.log(`[${getTime()}][INFO] npm install complete - ${Math.trunc(duration)}ms`);
        });
    })
    .catch((err) => {
      console.error(`[${getTime()}][ERROR]`, err.stack);
    });
};
