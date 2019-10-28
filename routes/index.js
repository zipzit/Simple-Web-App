var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Simple Web App' });
});

router.get('/chart', function (req, res, next) {
    res.render('chart', { title: 'Chart of Data' });
})

module.exports = router;
