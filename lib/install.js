const spawn = require('child_process').spawn;

/**
 * Spawn the system version of npm and runs install
 * @param   {Object} config
 * @returns {Promise}
 */
module.exports = function install(config) {
  return new Promise((resolve, reject) => {
    const command = config.ci ? 'ci' : 'install';

    let args = [command];

    if (!config.ci && config.production) {
      args.push('--production');
    }

    // inherit the stdio so we get the colors and output
    const child = spawn('npm', args, { stdio: 'inherit' });

    child.on('error', reject);

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('npm exited with a non zero status'));
      }
    });
  });
};
