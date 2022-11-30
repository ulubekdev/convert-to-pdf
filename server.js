const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`nodejs-convert-file-server listening at http://localhost:${port}`);
});

// if you get error like this:
// The "chunk" argument must be of type string or an instance of Buffer or Uint8Array
// you need to get license key from https://dev.pdftron.com/get-key