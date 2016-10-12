import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
// required module
import faces from './routes/face.routes';
import auth from './routes/auth.routes';
import sampleData from './sampleData';
import serverConfig from './config';
import authConfig from './auth';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('error when trying connect to MongoDB');
    throw error;
  }
});

// instantiate 
const app = Express();

// general configuration
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api', faces);
app.use('/api', auth);
authConfig(passport);

// main page render function
const htmlPage = () => {
  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${serverConfig.appName}</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans|Playfair+Display" rel="stylesheet">
        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
      </head>
      <body>
        <div id="content"></div>
        <script>
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
    `;
};

app.all('/*', function(req, res) {
  res
    .set('Content-Type', 'text/html')
    .status(200)
    .send(htmlPage());
});

// start server
app.listen(serverConfig.port);
console.log('Start at: ' + serverConfig.port);

export default app;