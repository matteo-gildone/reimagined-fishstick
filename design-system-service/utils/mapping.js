const journalCardLabels = {
    "publishingModel": "Publishing model",
    "impactFactor": "Impact factor",
    "download": "Download",
    "submission": "Submission to first decision (median)"
};

const journalCardLabelMapping = list => {
    return list.map(item => {
        const {title, summary} = item;
        const metadata = Object.keys(item)
            .map(key => {
                return journalCardLabels[key] ? {label: journalCardLabels[key], text: item[key]} : null;
            })
            .filter(item => item !== null);
        return {
            title, summary, metadata
        }
    });

};

const journalCardLabelMapping2 = list => {
    return list.map(item => {
        const {journalTitle, contentType, summary} = item;
        const metadata = Object.keys(item)
            .map(key => {
                return journalCardLabels[key] ? {label: journalCardLabels[key], text: item[key]} : null;
            })
            .filter(item => item !== null);
        return {
            title: journalTitle, cardLabel: contentType, summary, metadata
        }
    });

};

const consistentLinks = config => {
    const productLinks = [{
        url: "#", label: "Product"
    }, {
        url: "#", label: "Another product"
    }];

    const legalLinks = [{
        url: "#", label: "Legal"
    }];

    const featureLinks = [{
        url: "#", label: "Feature"
    }, {
        url: "#", label: "Another feature"
    }];
    const data = {};

    data.links = [];

    if (config.isProduct) {
        data.links = data.links.concat(productLinks);
    }

    if (config.isLegal) {
        data.links = data.links.concat(legalLinks);
    }

    if (config.isFeature) {
        data.links = data.links.concat(featureLinks);
    }

    return data;
};

module.exports = {
    journalCardLabelMapping, journalCardLabelMapping2, consistentLinks
}