#!/usr/bin/env node

/**
 * @file CLI Configuration
 */

// External
const path = require('path');

// Commands
const install = require('./commands/install');

require('yargs') // eslint-disable-line no-unused-expressions
  .command({
    command: 'install',
    aliases: ['i'],
    desc: 'Wrapper for npm install that provides a caching layer for node_modules/',
    builder: yargs => yargs
      .option('production', {
        alias: 'p',
        describe: 'Do not install devDependencies. Does not work with --ci',
        boolean: true,
        default: true
      })
      .option('ci', {
        describe: 'Use npm ci instead of npm install',
        boolean: true,
        default: false
      })
      .option('gzip', {
        alias: 'g',
        describe: 'Use gzip to compress tarballs',
        boolean: true,
        default: true
      })
      .option('clean', {
        alias: 'c',
        describe: 'Delete existing node_modules before installing. This happens automatically when using --ci',
        boolean: true,
        default: false
      })
      .option('cache-directory', {
        alias: 'd',
        describe: 'The folder where the tarballs are saved',
        default: '~/.sc-cache',
        coerce: str => path.resolve(str)
      }),
    handler: install
  })
  .demandCommand()
  .argv;
