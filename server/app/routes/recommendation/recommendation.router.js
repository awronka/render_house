var router = require('express').Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');



////////////////////////////UTILITY FUNCTIONS/////////////////////////////////////

function topTags(tag){
    Product.find({tag:tag})
    .then(function(err,prods){
        if (err) return err
        
        
        
    })
}



router.get('/', function(req, res, next) {
    if (req.session){
/////////rec engine if the user is signed in
        User.find({
                _id: id
        })
        .populate('purchaseHistory')
        .then(function(err,data) {
            
            if(err) {console.log('!!!!!ERROR!!!!!!',err)}
            
            var searchedTags = data.purchaseHistory.map(function(obj){
                    return obj.tags
                    }
                )
            
          
            
            
            
        })
        .then(null, next);
});



module.exports = router;
