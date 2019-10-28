var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


/* GET home page. */
router.get('/getall', function (req, res, next) {
    getUserData()
        .then(data => (
            res.render('users', {
                title: 'Our Team',
                buttonType: {
                    admin: true
                }, data
            })
        ))
});

var getUserData = function () {
    //readFile is an asynchroneous process
    return new Promise(function (resolve, reject) {
        fs.readFile('./data/user.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                reject("Read file error: ", err)
            }
            try {
                // console.log('File data:', jsonString)
                const usersObj = JSON.parse(jsonString)
                resolve(usersObj)  // what if .parse fails?
            }
            catch (err) {
                reject("Parse JSON error: ", err)
            }
        })
    })
}

module.exports = router;
