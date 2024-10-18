const express = require('express');
const hbs = require('hbs');
const app = express();
const port = 3001;

const {ds} = require('./utils/ds');
const {consistentLinks, createMapping, createMapping2} = require("./utils/mapping");

const {registerComponent, getSpecificVersion} = ds();

hbs.registerPartials(__dirname + '/eds');


registerComponent('header/header', {
    version: 'v1',
    template: version => `${version}/header/header`,
    transform: consistentLinks
});

registerComponent('header/header', {
    version: 'v2',
    template: version => `${version}/header/header`,
    transform: consistentLinks
});

registerComponent('card/card', {
    version: 'v1',
    template: version => `${version}/card/card`,
    transform: createMapping
});

registerComponent('card/card', {
    version: 'v2',
    template: version => `${version}/card/card`,
    transform: createMapping2
});



app.get('/', (req, res) => {
    res.send('Design system service');
});

app.get('/header', (req, res) => {
    const {query} = req;
    const {version} = query;
    const component = getSpecificVersion('header/header', version);
    const data = component.transform(query);

    const template = hbs.compile(`{{> ${component.template(version)}}}`);
    res.send(template(data));
});

app.get('/journal-card-list', (req, res) => {
    const {query} = req;
    const {version} = query;
    const component = getSpecificVersion('card/card', version);
    const template = hbs.compile(`{{#each .}}{{> ${component.template(version)}}}{{/each}}`)

    res.send(template(component.transform(query.journals)));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});