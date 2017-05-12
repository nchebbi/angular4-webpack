if(process.env.NODE_ENV && process.env.NODE_ENV == 'dev')
{
    module.exports = require('./config/webpack/webpack.dev.js');
}
else if(process.env.NODE_ENV && process.env.NODE_ENV == 'prod')
{
    module.exports = require('./config/webpack/webpack.prod.js');
};