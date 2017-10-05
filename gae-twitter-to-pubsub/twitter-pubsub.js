//Twitter credentials in separate config file
var twitterCreds = require('./twitterCreds.json');

//twitter setup
var Twit = require('twit');
var T = new Twit(twitterCreds); 

//twitter parameters
var params = {
    track: 'trump'
} 

//pubsub setup
var pubsub = require('@google-cloud/pubsub')({
    //specify correct project ID
    projectId: 'ymg-twitter-node-dataflow-bq',
    keyFilename: 'key.json'
  });
var topic = pubsub.topic('tweets'); //specify pubsub topic - create via GCP console or CLI
var publisher = topic.publisher();

var stream = T.stream('statuses/filter', params)

//start streaming tweets in and publishing them to PubSub
stream.on('tweet', function (tweet) {
    console.log("got tweet!")
    publisher.publish(new Buffer(JSON.stringify(tweet)), function(err, messageId) {
        //if can't publish - 
        function onError(err) {
            console.log("error publishing - " + err);
        }
    });
})
