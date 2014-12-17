var express = require('express');
var qs = require('qs');
var geovoronoi = require('geovoronoi');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/compute', function(req, res) {
	console.log('Spots: ' + req.body.spots);
	// geovoronoi.compute
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})