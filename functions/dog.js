const functions = require('firebase-functions');
const express = require('express')
const admin = require('firebase-admin')
const request = require('request');
const app = express();
const cors = require('cors')


app.use(cors({ origin: true }));
app.get('/puppers', (req,res) => {
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

exports.dog = functions.https.onRequest(app);

