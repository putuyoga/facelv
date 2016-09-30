/**
 * Entry Script
 */

if(process.env.NODE_ENV === 'production') {
    // production environment
    console.log('we are run on production server');
    process.env.webpackAssets = JSON.stringify(require('./dist/manifest.json'));
    process.env.webpackChunkAssets = JSON.stringify(require('./dist/chunk-manifest.json'));
    require('./dist/server.bundle.js');
} else {
    // development environment
    require('babel-register');
    require('./server/server');
}