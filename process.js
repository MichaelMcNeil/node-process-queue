var redis = require('redis'),
    rc = redis.createClient(),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

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

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal){
        console.log('worker ' + worker.process.pid + ' died');
    });
}
else{
    processQueue();
}
