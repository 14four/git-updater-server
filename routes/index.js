module.exports = function(io) {
    var app = require('express');
    var router = app.Router();

    io.on('connection', function(socket){
      socket.join('some room');
    });

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    router.post('/', function(req, res, next) {
      //console.log("Req", req.body, req.params);
      io.sockets.emit('update', "git yer update yo!");
      res.send(200, "OK");
    });

    // router.get('/update', function(req, res, next) {
    //   console.log("Req", req.body, req.params);
    //   io.sockets.emit('update', "git yer update yo!");
    //   res.send(200, "OK");
    // });

    return router;
}
