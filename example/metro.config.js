const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const path = require('path');
const pak = require('../package.json');
const escape = require('escape-string-regexp');

const root = path.resolve(__dirname, '..');
const localLib = path.resolve(root, 'src');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

// Peer dependencies to alias
const modules = Object.keys({ ...pak.peerDependencies, ...pak.dependencies });

const config = {
  projectRoot: __dirname,
  watchFolders: [root, localLib],
  resolver: {
    blockList: modules.map(
      m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`),
    ),
    // Force all peer dependencies (including React) to resolve from app
    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
