const Linkedin = require('node-linkedin')('86m7i2v7ciso5w', '8O1bVWMLqzLxHLiw');
const express = require('express')
const app = express()

var scope = ['r_basicprofile','w_share','r_emailaddress'];


app.get('/oauth/linkedin', function(req, res) {
    Linkedin.setCallback(req.protocol + '://' + req.headers.host + '/oauth/linkedin/callback');

    // This will ask for permisssions etc and redirect to callback url.
    Linkedin.auth.authorize(res, scope);
});

app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if ( err )
            return console.error(err);
            console.log(results.access_token)
            const linkedin = Linkedin.init(results.access_token);


            linkedin.people.url('https://www.linkedin.com/in/romain-denamur-833041153/',  ['id', 'first-name', 'last-name', 'email-address'],function(err, $in) {
                return res.json($in);
            });

            // Linkedin.people.id('kevin-czaja-69553456', function(err, $in) {
            //     console.log("laa")
            // });

 
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })