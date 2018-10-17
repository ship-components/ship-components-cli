
const spawn = require('child_process').spawn;

/**
 * Spawn the system version of npm and runs install
 * @param   {Object} config
 * @returns {Promise}
 */
module.exports = function backgroundPackage(config) {
  const command = 'tar';

  const args = [config.gzip ? '-czf' : '-cf', config.destination, config.source.join(' ')];

  // Ignore the stdio and detach otherwise the process
  // will stay open blocking the build
  const child = spawn(command, args, {
    stdio: 'ignore',
    detached: true
  });

  // Allows parent to exist before child
  child.unref();

  child.on('error', (err) => {
    console.error(err);
  });
};
