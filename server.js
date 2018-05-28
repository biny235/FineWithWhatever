const { syncAndSeed } = require('./server/db');
const server = require('http').createServer(require('./server/app'));

const port = process.env.PORT || 3000;

syncAndSeed()
  .then(() => {
    server.listen( port, ()=> console.log(`Listening on port ${port}`));
  });

