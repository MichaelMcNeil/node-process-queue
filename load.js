var redis = require('redis')
    , cluster = require('cluster')
    , numMsgs = process.argv[2] || 1000000
    , benchmark = require('../node-benchmark/benchmark.js')
    , i
    , numForks = 8;

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
    rc = redis.createClient();
    for(i = 0; i < numMsgs/numForks; i++){
        rc.lpush('messages', i, process.send(null));
    }
}
