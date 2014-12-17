var express = require('express');
var qs = require('qs');
var geovoronoi = require('./geovoronoi');

var app = express();

app.set('port', (process.env.PORT || 5000));

// app.get('*', function(req, res, next) {
//   if (req.query.spots) {
//     console.log("Spots: "+req.query.spots);
//   };
//   next();
// });

app.get('/compute', function(req, res) {
	if(req.query.spots) {
		var spots = req.query.spots;
		console.log('Spots: ' + spots);
		var voronoigraph = geovoronoi.getGeoVoronoiGraph(spots);
		res.end('' + JSON.stringify(voronoigraph));
	} else {
		res.end('please provide spots');
	}
});

app.get('/', function(req, res) {
	res.end('please go to /compute?spots[]');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});