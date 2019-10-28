var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer();

/* GET xxx page. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
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

/* GET home page. */
router.get('/add', function (req, res, next) {
    res.render('adduser', { title: 'Add New Team Member' });
});

router.post('/addUserPostxx', function (req, res, next) {
    // console.log(req)
    // Total fail here. Can't see inside req. 
    console.log("post submission: ", req.body)
    res.send({text:"got the post request"})
});

router.post('/addUserPost', upload.none(), (req, res) => {
    // ref S.O.37630419
    const formData = req.body;
    console.log('form data', formData);
    res.sendStatus(200);
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
