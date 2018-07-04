const express = require('express');
const path = require('path');
const config = require('../config');
// var compression = require('compression')

const app = express();
// app.use(compression())
// serve our static stuff like index.css
app.use(express.static(config.build.assetsRoot));
// app.get('*/login.html', function (req, res) {
//   // and drop 'public' in the middle of here
//   res.sendFile(path.join(__dirname, 'dist', 'login.html'))
// })
// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  // and drop 'public' in the middle of here
  res.sendFile(path.join(config.build.assetsRoot, 'index.html'));
});

const PORT = process.env.PORT || config.build.port;
app.listen(PORT, () => {
  console.log(`Production Express server running at localhost:${PORT}`);
});
