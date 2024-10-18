const express = require('express');
const app = express();
const port = 3002;

const journalList = require('./data/journal-list.json');
const journalList2 = require('./data/journal-list2.json');

app.get('/journal-list', (req, res) => {
    res.json(journalList);
});

app.get('/v2/journal-list', (req, res) => {
    console.log('here');
    res.json(journalList2);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});