const path = require('path');
const fsj = require('fs-jetpack');
const debug = require('debug')(process.env.DEBUG || '');


const COMPONENTS_PATH = path.join(__dirname, '..', '..', 'design-system', 'components');
const DIST_PATH = path.join(__dirname, '..', 'eds');

const movePartials = (src, dest) => {
    debug('🤖 Running movePartials.js  ...');
    debug(`📥 Fetching partials from ${COMPONENTS_PATH}`);

    if (fsj.exists(COMPONENTS_PATH)) {
        fsj.copy(COMPONENTS_PATH, DIST_PATH, {
            overwrite: true,
            matching: '*.hbs'
        });
        debug(`🏁 Finished`);
    } else {
        debug(`⛔ ${COMPONENTS_PATH} not found`);
    }
    debug(`🏁 Finished`);
};

movePartials(COMPONENTS_PATH, DIST_PATH);
