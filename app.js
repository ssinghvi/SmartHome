/* @author Sameer Singhvi 
 * @version 1.0
 */

var express         = require('express'),
    http            = require('http'),
    router          = express.Router(),
    port            = process.env.PORT || 6183,
    bodyParser      = require('body-parser'),
    app             = express(),
    server          = http.createServer(app),
    debug           = true,
    GPIO            = require('onoff').Gpio,
    temp_sensor     = new GPIO(17, 'in', 'both');

/* System Configuration */
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function initialize() {
  server.listen(port);
  if(debug) console.log('Server Running on :' + port);
  temp_sensor.watch(handle_temp);
  process.on('SIGINT', exit);
}

initialize();

/* Root URL */
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function handle_temp(err, data) {
  if(err)
    throw err;

  console.log(data);
}

function exit() {
  console.log('SIGINT Received... releasing resources.');
  temp_sensor.unexport();
  process.exit();
}
