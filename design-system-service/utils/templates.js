const path = require('path');
const fsj = require('fs-jetpack');
const debug = require('debug')(process.env.DEBUG || '');

const movePartials = (src, dest) => {
    debug('🤖 Running movePartials.js  ...');
    debug(`📥 Fetching partials from ${src}`);

    if (fsj.exists(src)) {
        fsj.copy(src, dest, {
            overwrite: true,
            matching: '*.hbs'
        });
        debug(`🏁 Finished`);
    } else {
        debug(`⛔ ${src} not found`);
    }
    debug(`🏁 Finished`);
};

['v1'].forEach(version => {
    const COMPONENTS_PATH = path.join(__dirname, '..', '..', 'design-system', version, 'components');
    const DIST_PATH = path.join(__dirname, '..', 'eds', version);
    movePartials(COMPONENTS_PATH, DIST_PATH);
});

