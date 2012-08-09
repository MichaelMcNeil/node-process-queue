var redis = require('redis')
    , rc = redis.createClient();

var i;
for(i = 0; i < 1000000; i++){
    rc.lpush('messages', i);
}

console.log('done');
