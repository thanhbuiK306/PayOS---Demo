const mongoose = require('mongoose');

exports.MongoConnect = () => {

	mongoose.set('debug', (coll, method, query, doc, options) => {
		let logs = {
			collection: coll,
			method: method,
			query: query,
			doc: doc,
			options: options
		}
		// console.log(logs)
	})

	mongoose.Promise = global.Promise
	const connection = mongoose.connection
	// const options={
	// 	user:"root",
	// 	pass:"password"
	// }
	// connection.openUri(process.env.MONGO_URL, options) 
	connection.openUri(process.env.MONGO_URL)

	connection.once('open', () => {
		console.log('Database connection is successful :)') 
	})

	connection.on('error', () => {
		console.log('Database connection failed :(')
	})
};

