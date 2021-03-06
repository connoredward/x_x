const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withPlugins([
  [withCss],
  [withSass, {
    cssModules: true
  }],
  [withImages]
], {
  publicRuntimeConfig: {
    api: {
      url: process.env.API_URL || 'http://localhost:8080/'
    }
  }
});