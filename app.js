'use strict';

const express = require('express');
const pug = require('pug');
const app = express();
const mongo = require('mongodb');
const api = require('./routes/api.js');

mongo.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/url-shortener', (err, db) => {
	if (err) throw err;
	console.log('connected to mongodb');

	app.set('view engine', 'pug');
	app.set('views', './views');

	db.createCollection('websites', {
		capped: true,
		size: 5242880,
		max: 5000
	});

	app.get('/', (req, res) => {
		res.render('index');
	});

	api(app,db);


	let port = process.env.PORT || 8080;
	app.listen(port, () => {

		console.log('server started on port 8080');

	});

});

