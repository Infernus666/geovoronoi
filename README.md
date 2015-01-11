# geovoronoi
A geo wrapper over a Voronoi that handles edge cases for GeoLocations


I'm using <a href="https://github.com/gorhill/Javascript-Voronoi">this</a> Javascript implementation of Voronoi. Although it works perfectly for normal X-Y plane, it wouldn't quite fit in for geo locations. So, I've written a Geo wrapper over it, which basically does the following patch-work.
<ol>
<li>Longitudes don't stay linear near the international date line. It discontinues. Goes like '..., 178, 179, -179, -178,...'. GeoVoronoi would take care of this.</li>
<li>Auto-boxing super area of sites with optimal padding. (<code>Bbox</code> in code).</li>
<li>Keeping latitude-longitudes sanitized in terms of range and decimal places.</li>
</ol>

<h1>Usage</h1>
Input an array of latitude-longitudes and a <strong>voronoi-graph</strong> will be returned to you. The information inside voronoi graph can be used to do calculations, to determine zones and even to draw the Voronoi Diagram on a plane, GoogleMap, etc.

<pre>
var sites = [{x:32.123456, y:-175.654321}, {x:32.214365, y:162.123234}, {x:32.907856, y:-162.098765}, {x:32.019283, y:172.102938}, {x:32.444555, y:-176.555444}, {x:32.333222, y:-179.222333}];
var geoVoronoi = new GeoVoronoi();
geoVoronoi.computeGeoVononoi(sites);
var voronoiGraph = geoVoronoi.voronoiGraph;
</pre>

Above code will result into following <a href="https://dl.dropboxusercontent.com/u/49221136/sample_voronoi_graph.txt">voronoi-graph data</a>.

This <code>voronoiGraph</code> object contains following 3 major objects and a key-value for execution time.
<ol>
<li>
<code>cells</code>: This contains information for all the polygons(zone) along with their owner sites. A polygon is represented by <code>halfedges</code> (called so as most of them are shared among two adjacent polygons). Each half edge has start and end vertices called va and vb respectively. Set of start vertices of all half-edges will be all the vertices of the polygon. Information of cells is enough for basic calculations.
</li>
<li>
<code>edges</code>: This contains information about start and end points of all the edges in the resulting Voronoi diagram.
</li>
<li>
<code>vertices</code>: This contains information about all the vertices in the resulting Voronoi diagram.
</li>
</ol>

Please refer to this <a href="https://github.com/gorhill/Javascript-Voronoi/blob/master/README.md">README</a> for the data inside cells.
