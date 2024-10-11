const express = require('express');
const hbs = require('hbs');
const app = express();
const port = 3001;

hbs.registerPartials(__dirname + '/eds');

app.get('/', (req, res) => {
    res.send('Design system service');
});

app.get('/header', (req, res) => {
    const template = hbs.compile('{{> header/headerTest}}')
    res.send(template({variable: 'jello world!'}));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});