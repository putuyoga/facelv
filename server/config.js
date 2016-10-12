const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/fldv',
  port: process.env.PORT || 6969,
  appName: 'faceLv',
  secretKey: 'faceLvKey',
  jwtSession: { session: false }
};

export default config;
