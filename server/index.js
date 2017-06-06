const server = require('./libraries/server');
const database = require('./libraries/database');

database.connect(process.env.MONGODB_URI)
  .then(() => {
    server.listen(process.env.PORT);
  });
