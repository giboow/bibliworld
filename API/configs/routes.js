'use strict';

module.exports = function (app) {
    require('../routes/index')(app);
    require('../routes/user')(app);
    require('../routes/book')(app);
    require('../routes/testSwagger')(app);
};