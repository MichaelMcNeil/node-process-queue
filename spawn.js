var childProcess = require('child_process'),
    ls = [],
    i;

var num_nodes = process.argv[2] || 1;


for(i = 0; i < num_nodes; i++){
    ls.push(childProcess.exec('node process.js', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        
        console.log('Child Process STDOUT: '+stdout);
        console.log('Child Process STDERR: '+stderr);
    }));
}
