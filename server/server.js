import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// required module
import faces from './routes/face.routes';
import sampleData from './sampleData';
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('run `mongod` from cmd/shell');
    throw error;
  }

  // feed some sample data in DB.
  sampleData();
});

// instantiate 
const app = Express();

// general configuration
app.use(Express.static('client/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', faces);

app.all('/*', function(req, res) {
  res.sendFile('client/index.html', {'root': './'});
});

// start server
app.listen(serverConfig.port);
console.log('Start at: ' + serverConfig.port);