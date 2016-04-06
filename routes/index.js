module.exports = function(io) {
    var app = require('express');
    var router = app.Router();
    var latestHash = {};

    // socket.io events
    io.on( "connection", function( socket )
    {
      console.log( "A user connected" );
      socket.on("check", function(data)
      {
        console.log("data:", data);
        if (latestHash[data.branch] && latestHash[data.branch] != data.hash)
        {
          socket.emit("update", {message:"Not quite there yet.", hash:hash, branch:branch});
        }
      })
    });

    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    router.post('/', function(req, res, next) {
      try
      {
        var branch = req.body.push.changes[0].new.name;
        var hash = req.body.push.changes[0].new.target.hash;
        console.log("Hash:", hash, "\nBranch:", branch);
        latestHash[branch] = hash;
      }
      catch (e)
      {
        console.log("Error parsing the hash updates.");
      }

      io.sockets.emit('update', {message:"git yer update yo!", hash:hash, branch:branch});
      res.status(200).send("OK");
    });

    // router.get('/update', function(req, res, next) {
    //   console.log("Req", req.body, req.params);
    //   io.sockets.emit('update', "git yer update yo!");
    //   res.send(200, "OK");
    // });

    return router;
}
