const express = require('express');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const {promisify} = require('util');
const path = require('path');
const axios = require("axios");
const app = express();
const port = 3004;
const version = 'v1'

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res, next) => {
    try {
        const headerParams = {isFeature: true, isLegal: true , version};
        const headerResponse = await axios.get('http://localhost:3001/header', {params: headerParams});
        const journalListAPIResponse = await axios.get('http://localhost:3002/journal-list');
        const journalListResponse = await axios.get('http://localhost:3001/journal-card-list', {
                params: {
                    journals: [...journalListAPIResponse.data],
                    version

                }
            });

        const footerResponse = await axios.get('http://localhost:3001/footer', {params: {links: [{
                    url: "#", label: "Product"
                }, {
                    url: "#", label: "Another product"
                }], version}});

        console.log(footerResponse.data);

        res.render('index', {
            title: 'Homepage',
            headerPlaceholder: headerResponse.data,
            journalListPlaceholder: journalListResponse.data,
            footerPlaceholder: footerResponse.data
        });
    } catch (err) {
        return new hbs.SafeString(err.message, {});
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});