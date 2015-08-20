/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User')
var Product = mongoose.model('Product')
var _ = require('lodash');
var chance = require('chance')();

/////////////////////////////////////////////////////// Utility Functions //////////////////////////////

function generateCollections (num,seedFunc){
  return _.times(num,seedFunc)
}
''
var numUsers = 100,
    numProducts = 300;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////Person Generation///////////////////////////////////////
function randPersonPhoto (){
    return 'http://lorempixel.com/400/200/people/'
}

var seedUser = function(){
    var first = chance.name().split(" ")[0];
    var last = chance.name().split(" ")[1];
    return new User({
        isAdmin: Math.random() < .02,
        firstName: first,
        lastName: last,
        displayName: first+" "+last,
        phone: chance.phone(),
        userBlurb: chance.paragraph({sentence:4}),
        email: chance.email(),
        password: "",
        salt: "",
        pictureUrl: randPersonPhoto()
        // purchaseHistroy:chance.pick(productObjectId)
    });
}



//////these functions generate the users than extrapolates out the objectId///////////////




/////////////////////////////////////// product generation ///////////////////////////////////////////////
// this function generates random tags for the products based off the industry and specfic forms of the tags
function generateTags(){
   var listOfIndustryTags = ['architectural','video games','general design','advertisers','academics']
   var lengthIndTags = listOfIndustryTags.length;
   var listOfSpecificTags = ['bench','chair','table','floating island','car','person','zombie']
   var lengthSpecTags = listOfSpecificTags.length;
   return [listOfIndustryTags[Math.floor(Math.random()*lengthIndTags)], listOfSpecificTags[Math.floor(Math.random()*lengthSpecTags)]]
};

function randProductPhoto () {
   return 'http://http://lorempixel.com/g/400/200/'
}

function randModel () {
  var listOfModels = ['models/untitled-scene/untitled-scene.json','models/baymax.json','models/plane/plane.json'];
  var numOfModels = listOfModels.length;
  return listOfModels[Math.floor(Math.random()*numOfModels)];
}


var seedProduct = function(){
   return new Product({
       title: chance.name(),
       description: chance.paragraph({sentence:4}), // reeturns a rand paragraph with 4 sentences


       snapshotFileUrl: randPhoto(), //return the website lorempixel
       modelFileUrl: randModel(),
       tags: generateTags(), // runs function above and assigns two types of tags to every instance
       license: chance.natural(), // generates a number between 0 to 9007199254740992
       formatsAvailable: "JSON", //hardcoded for now since we only have JSON object
       price: chance.integer({min:0,max:1000}), // generates 
       freeOption: Math.random() < .5,
       creator: chance.name(),
       timesDownloaded: chance.integer({max:20}),
       webRenderScale: .028
       // comments: [{type: mongoose.Schema.Types.ObjectId, ref:"UserComments"}]
   })
}


var seededUsers = generateCollections(numUsers,seedUser);

var userObjectId = seededUsers.map(function(obj){
       return obj._id
 })

var seededProducts = generateCollections(numProducts,seedProduct);

////////////////////// Seeding function - to be run when the DB starts up
function seed () {
    seededUsers.map(function(obj){
        // console.log(obj);
        obj.save(function(err) {
            console.log("Error", err);
        })   
    });
    seededProducts.map(function(obj){
        console.log(obj);
        obj.save(function(err){
            console.log('error',err)
        });
    })
}

connectToDb.then(function(){
    seed();  
})
