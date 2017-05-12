
module.exports = function(bs) {

  return {
    server: {
      "baseDir": "wwwroot",
    "routes": {
      "/node_modules": "node_modules"
    },
    "files": ["./wwwroot/*"],
      middleware: {
        // overrides the second middleware default with new settings
        1: require('connect-history-api-fallback')({
         //index: '/index.ts.html',
          index: '/index.html',
          verbose: true
        })
      }
    }
  };

};
