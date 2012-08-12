var redis = require('redis'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    benchmark = require('../node-benchmark/benchmark.js'),
    numForks = process.argv[2] || numCPUs;

var processQueue = function(rc){
    rc.brpop('messages', 0, function(err, result){
        process.send(null);

        if(err){
            console.log(err);
        }else{
            processQueue(rc);
        }
    });
};

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numForks; i++) {
        worker = cluster.fork();

        worker.on('message', function(msg){
            benchmark.tick();
        });
    }
}
else{
    processQueue(redis.createClient());
}
