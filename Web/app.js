const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/PriorityQueue.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/PriorityQueue.js');
});
app.get('/UCS.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/UCS.js');
});
app.get('/Astar.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/Astar.js');
});
app.get('/input.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/input.js');
});
app.get('/map.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/map.js');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});