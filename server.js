var express = require('express');
var path = require('path');
var Twitter = require('twitter');
var dotenv = require('dotenv').config();
var app = express();

var client = new Twitter({
    consumer_key: 'V26r5NHNDJ6XrWvXA1CF0M1Ta',
    consumer_secret: 'QIbWwj36CBF8LWnuvSWVWCS0qXlWJAGpLvxCVL9qDY6klhcDyL',
    access_token_key: '49551882-hkeWkeUFem1PSRecwNqiocKysMLTdnkuAIgZiluLm',
    access_token_secret: 'pQe4VnepLFoxwgJtJZHIMfJCBiufDB8A0eE6CxNWX5w5S',
});


app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '/client')));

app.get('/q*', function(req, res){
	var user = req.url.slice(2);
	getTweets(user);
	setTimeout(function(){
	console.log(myTweets);
	res.status(200).send(myTweets);
	}, 600);
})

var myTweets = [];

function getTweets(user){
    var params = {screen_name: user,
                  count: 5};
    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', params, function(error, tweets, response){
        if(error){
            console.log(error);
        }
        else{
        	myTweets = tweets;
                }
        }
    );
}

var port = process.env.PORT || 3000;
console.log('Fullstack Twitter is listening on ' + port);
app.listen(port);