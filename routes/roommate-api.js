var path = require('path');
var models = require('../models');

module.exports = function (app) {

    //Post new with picture
    app.post('/api/roommates', function (req, res) {
      var imgPath;
      var userId = req.body.userId;

        if (req.files.roommatePicture) {
          var userPicture = req.files.roommatePicture;
            imgPath = '/RoommateImages/' + userId + '_' + req.body.name + '.jpeg';

          roommatePicture.mv(path.join(__dirname, '../public' + imgPath), function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        } else {
            imgPath = 'https://api.adorable.io/avatars/285/' + req.body.name + '.png'
        }

        models.Roommates.create({
            name: req.body.name,
            UserId: userId,
            picture: imgPath,
            rlocation: req.body.rlocation,
            gender: req.body.gender,
            withRoom: req.body.withRoom,
            age: req.body.age,
            bio: req.body.bio
        }).then(function () {
            res.redirect('/profile/view-roommates');
        });

    });

    //Upload roommate picture
    app.post('/api/newroommateimg/upload', function (req, res) {
        if (!req.files.roommatePicture) {
            return res.status(400).send('No files were uploaded');
        }

        var roommatePicture = req.files.roommatePicture;
        var roommateId = req.body.id;
        console.log(roommateId);
        var imgPath = '/RoommateImages/' + req.user.id + '_' + req.body.name + '.jpg';

        roommatePicture.mv(path.join(__dirname, '../public' + imgPath), function (err) {
            if (err) {
                return res.status(500).send(err);
            }

            models.Roommates.update({
                picture: imgPath
            }, {
                where: {
                    id: roommateId
                }
            });
            res.redirect('/profile/view-roommates');
        });
    });

    //Updating roommmate's info
    app.put('/api/update-roommate', function (req, res) {
        models.Roommates.update({
            name: req.body.name,
            rlocation: req.body.rlocation,
            withRoom: req.body.withRoom,
            age: req.body.age,
            bio: req.body.bio
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbUsers) {
            res.redirect('/profile/view-roommates');
        });
    });

    //Delete roommate
    app.delete('/api/delete-roommate/:id', function (req, res) {
        models.Roommates.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbRoommates) {
            res.send('deleted');
        });
    });

    //Get roommate
    app.get('/api/roommate/:id', function (req, res) {
        models.Roommates.findOne({
            where: {
                id: req.params.id * 1
            }
        }).then(data => {
            res.json(data);
        });
    });
}
