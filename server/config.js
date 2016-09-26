const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://putuyoga:11071993@ds046549.mlab.com:46549/facelvdb' || 'mongodb://localhost:27017/fldv',
  port: process.env.PORT || 6969,
};

export default config;
