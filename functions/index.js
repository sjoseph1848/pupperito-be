const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin')
admin.initializeApp();
const request = require('request');
const app = express();
const cors = require('cors')

 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

app.use(cors({origin:true}))
// Test to get the api working, will refactor now that it works
app.get('/doggos', (req,res) => {
    const options = {
        'method': 'POST',
        'url': 'https://api.petfinder.com/v2/oauth2/token?=',
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        formData: {
          'grant_type': 'client_credentials',
          'client_id': functions.config().client.id,
          'Client_Secret': functions.config().clientsecret.key
        }
      };
      request(options, (error, response) =>  { 
        if (error) throw new Error(error);
        const token = JSON.parse(response.body)
        const dogOptions = {
            'method': 'GET',
            'url': 'https://api.petfinder.com/v2/animals?type=dog&page=2',
            'headers': {
                'Authorization': `Bearer ${token.access_token}`    
        }
    }
    request(dogOptions, (error, response) => { 
        if (error) throw new Error(error);
        const dog = JSON.parse(response.body)
        res.send({dog})
      })
        
      });
})

exports.api = functions.https.onRequest(app)
