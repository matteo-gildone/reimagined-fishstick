const express = require('express');
const app = express();
const port = 3002;

const journalList = require('./data/journal-list.json');

app.get('/journal-list', (req, res) => {
    res.json(journalList);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});