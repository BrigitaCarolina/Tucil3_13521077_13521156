// Define the locations as vertices
var nodes = new vis.DataSet([
{id: 1, label: 'San Francisco'},
{id: 2, label: 'Los Angeles'},
{id: 3, label: 'Las Vegas'},
{id: 4, label: 'Seattle'},
{id: 5, label: 'New York'},
{id: 6, label: 'Chicago'}
]);

// Define the paths between locations as edges
var edges = new vis.DataSet([
{from: 1, to: 2},
{from: 1, to: 3},
{from: 1, to: 4},
{from: 5, to: 6},
{from: 5, to: 1},
{from: 6, to: 2}
]);

// Create the graph
var container = document.getElementById('map');
var data = {
nodes: nodes,
edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);