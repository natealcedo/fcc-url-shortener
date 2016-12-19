'use strict';

const express = require('express');
const pug = require('pug');
const app = express();
const mongo = require('mongoose');

app.set('view engine', 'pug');
app.set('views', './');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/api/:url*', (req, res) => {

	function isValidUrl(url) {
        // Got this online
		let regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
		return regex.test(url) ? true : false;
	}

	let url = req.url.replace('/api/', '');
	if (isValidUrl(url)) {
		res.send('valid');
	} else {
		res.json({
            url: "Url is invalid. Enter a a properly formatted one"
        });
	}
});

app.listen(3000, () => {
	console.log('server started on port 3000');
});