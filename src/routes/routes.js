const router = require('express').Router();
const oauth = require('./oauth');
const stream = require('./mainWebSite/stream');
const classement = require('./mainWebSite/classement');
const events = require('./mainWebSite/events');
const planning = require('./mainWebSite/planning');


router.use('/oauth', oauth);
router.use('/stream', stream);
router.use('/classement', classement);
router.use('/events', events);
router.use('/planning', planning);


module.exports = router;