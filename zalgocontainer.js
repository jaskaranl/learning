// const fs from "fs"
var fs = require('fs');
function zalgoContainer(cbTaker, cb) {
    var sync = true;
    cbTaker(cbWrap);
    sync = false;

    function cbWrap(er, data) {
        if (sync)
            process.nextTick(function() {
                cb(er, data);
            });
        else
            cb(er, data);
    }
}



/// consistentReadAsync
function consistentReadAsync (filename, callback) {
    if (cache.has(filename)) {
        // deferred callback invocation
        process.nextTick(() => callback(cache.get(filename)))
    } else {
        // asynchronous function
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data)
            callback(data)
        })
    }
}

///consistentReadSync
function consistentReadSync (filename) {
    if (cache.has(filename)) {
        return cache.get(filename)
    } else {
        const data = readFileSync(filename, 'utf8')
        cache.set(filename, data)
        return data
    }
}

