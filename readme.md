# ship-components-cli

Ship Components command line tools

## Installation

```shell
npm install ship-components-cli -g
```

### Command: install

npm install wrapper to handle caching based on a projects package-lock.json file.

#### Usage

```shell
$ sc install

Wrapper for npm install that provides a caching layer for node_modules/

Options:
  --help                 Show help                                     [boolean]
  --version              Show version number                           [boolean]
  --production, -p       Do not install devDependencies. Does not work with --ci
                                                       [boolean] [default: true]
  --ci                   Use npm ci instead of npm install
                                                      [boolean] [default: false]
  --gzip, -g             Use gzip to compress tarballs [boolean] [default: true]
  --clean, -c            Delete existing node_modules before installing. This
                         happens automatically when using --ci
                                                      [boolean] [default: false]
  --cache-directory, -d  The folder where the tarballs are saved
                                                               [default: "~/.sc-cache"]
```

## History

* 0.1.2 - Fixed issue with ~ not resolving correctly
* 0.1.1 - Changed default directory to ~/.sc-cache and fixed duration timing
* 0.1.0 - Initial commit
