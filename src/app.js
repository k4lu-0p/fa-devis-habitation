const express = require('express')
const app = express()
const port = 3333
const path = require('path');

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => {
    console.log(`Devis habitation : http://localhost:${port}`)
});