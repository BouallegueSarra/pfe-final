
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/ecole', { useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
useFindAndModify: false }) ; // usenewurlParser bch ki tbadel port te5dem


console.log('Connected à la base de donnée');

module.exports = { mongoose }; 
