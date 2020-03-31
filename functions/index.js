const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin')
admin.initializeApp();
const request = require('request');
const app = express();
const cors = require('cors')
const dog = require('./controllers/dog');

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.api = functions.https.onRequest(app);

exports.dog = dog.dog