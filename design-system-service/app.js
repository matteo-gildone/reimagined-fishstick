const express = require('express');
const hbs = require('hbs');
const sass = require('sass');
const app = express();
const port = 3001;
const fs = require('fs');


const {ds} = require('./utils/ds');
const {consistentLinks, journalCardLabelMapping, journalCardLabelMapping2} = require("./utils/mapping");

const {registerComponent, getSpecificVersion} = ds();

hbs.registerPartials(__dirname + '/eds');

// TODO: Automate component registration
registerComponent('header/header', {
    version: 'v1',
    template: version => `${version}/components/header/header`,
    transform: consistentLinks
});

registerComponent('footer/footer', {
    version: 'v1',
    template: version => `${version}/components/footer/footer`
});

registerComponent('card/card', {
    version: 'v1',
    template: version => `${version}/components/card/card`,
    transform: journalCardLabelMapping
});

// registerComponent('card/card', {
//     version: 'v2',
//     template: version => `v1/components/card/card`,
//     transform: journalCardLabelMapping2
// });

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

app.get('/footer', (req, res) => {
    const {query} = req;
    const {version, links} = query;
    const component = getSpecificVersion('footer/footer', version);
    const template = hbs.compile(`{{> ${component.template(version)}}}`);
    res.send(template({links: links}));
});

app.get('/journal-card-list', (req, res) => {
    const {query} = req;
    const {version} = query;
    const component = getSpecificVersion('card/card', version);
    const data = component.transform(query.journals);
    const template = hbs.compile(`{{#each .}}{{> ${component.template(version)}}}{{/each}}`)

    res.send(template(data));
});

app.get('/core', (req, res) => {
    const {query} = req;
    try {
        const data = fs.readFileSync('./dist/main.css', 'utf8');
        res.send(data);
    } catch (err) {
        console.error(err);
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});