const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').Config} */
const config = getDefaultConfig(__dirname);

// Agregamos soporte para archivos de modelos 3D y assets comunes
config.resolver.assetExts.push('glb', 'gltf', 'png', 'jpg');

module.exports = config;