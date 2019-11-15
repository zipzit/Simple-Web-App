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
                buttonType: {    // sample technique only
                    admin: true
                }, data
            })
        ))
});

var processUserData = function(data) {
    return new Promise(function (resolve, reject) {
        //note to self. I was going to process tel, sms, email links here...
        //but instead decided to process them in the handlebars template.
    })
}

/* GET home page. */
router.get('/add', function (req, res, next) {
    res.render('adduser', { title: 'Add New Team Member' });
});

router.post('/addUserPost', upload.none(), (req, res) => {
    // ref S.O.37630419
    const formData = req.body;
    console.log(formData);
    storeNewUserData(formData);
    // oops.  need to test for success, before submitting a res 200...
    res.sendStatus(200);
});

var storeNewUserData = async function (newUserObject) {
    const UserDataStore = await getUserData();
    UserDataStore.user.push(newUserObject)
    fs.writeFile('./data/user.json', JSON.stringify(UserDataStore), (err) => {
        if (err) { console.log('Error writing file:', err) }
        try {
            console.log("Db updated...")
        } catch (err) {
            console.log('Error writing file:', err)
        }
    })
}

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
