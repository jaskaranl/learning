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