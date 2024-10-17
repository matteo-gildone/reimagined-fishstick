const express = require('express');
const hbs = require('hbs');
const app = express();
const port = 3001;

hbs.registerPartials(__dirname + '/eds');

const journalCardMapping = {
    "publishingModel": "Publishing model",
    "impactFactor": "Impact factor",
    "download": "Download",
    "submission": "Submission to first decision (median)"
};

const createMapping = list => {
    return list.map(item => {
        const {title, summary} = item;
        const metadata = Object.keys(item)
            .map(key => {
                return journalCardMapping[key] ? {label: journalCardMapping[key], text: item[key]} : null;
            })
            .filter(item => item !== null);
        return {
            title, summary, metadata
        }
    });

}

app.get('/', (req, res) => {
    res.send('Design system service');
});

app.get('/header', (req, res) => {
    const {query} = req;
    const productLinks = [{
            url: "#",
            label: "Product"
        },
        {
            url: "#",
            label: "Another product"
        }];

    const legalLinks = [{
        url: "#",
        label: "Legal"
    }];

    const featureLinks = [{
            url: "#",
            label: "Feature"
        },
        {
            url: "#",
            label: "Another feature"
        }];
    const data = {}
    data.links = [];
    if (query.isProduct) {
        data.links = data.links.concat(productLinks);
    }

    if (query.isLegal) {
        data.links = data.links.concat(legalLinks);
    }

    if (query.isFeature) {
        data.links = data.links.concat(featureLinks);
    }

    const template = hbs.compile('{{> header/header}}')
    res.send(template(data));
});

app.get('/journal-card-list', (req, res) => {
    const {query} = req;
    const template = hbs.compile('{{#each .}}{{> card/card}}{{/each}}')
    res.send(template(createMapping(query.journals)));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});