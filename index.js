const express = require("express");
const socket = require("socket.io");
const spawn = require('child_process').spawn;
// const spawn = require('child_process').spawn;
// const py    = spawn('python', ['main.py']);
// var dataString = '';

// App setup
const PORT = process.env.PORT || 3000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

var req_count = 0;
var dataString = '';

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");


  socket.on("inputmsg", function (data) {
    // Olah data
    var py    = spawn('python', ['main.py', data]);

    py.stdout.on('data', function(data){
      dataString = data.toString();
    });

    py.stdout.on('end', function(){
      req_count += 1;
      console.log("Req Count:", req_count);
      console.log("Input:", data);
      console.log("Output:", dataString);

      io.emit("reply", dataString);
    });

  });

});
