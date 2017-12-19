// DB config
var Database = require('arangojs').Database;

var db = new Database('http://188.166.223.161:8529');	// db = require('arangojs')() has the same result but this tells me the port used.
db.useDatabase('designknus');
db.useBasicAuth('knuseradmin', 'theKNisSilent');

exports.db = db;

// Collections
const Customers = db.collection('Customers');


exports.db.findUser = function(email, callback) {
	console.log(email);
	Customers.document(String(email)).then(
		result => {
			console.log('Found customer: ', result);
			callback(1);
		}, err => {
			console.error('ERR: ', err);
			callback(null);
		}
	);
}

exports.db.newUser = function(data, callback) {
	Customers.save(data).then(
		result => {
			console.log('Saved customer details! ', result);
			callback(0)
		}, err => {
			console.error('ERROR SAVING DETAILS: ', err);
			callback(1);
		}
	);
}