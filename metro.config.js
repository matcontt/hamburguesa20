const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ESTA LÍNEA ES LA QUE SOLUCIONA TU ERROR
config.resolver.assetExts.push('glb', 'gltf', 'png', 'jpg');

module.exports = config;