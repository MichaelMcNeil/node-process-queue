var redis = require('redis'),
    rc = redis.createClient();

var processQueue = function(){
    rc.brpop('messages', 0, function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            processQueue();
        }
    });
};

processQueue();
