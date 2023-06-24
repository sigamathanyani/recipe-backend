const mongoose = require('mongoose')

const connections = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connections;
