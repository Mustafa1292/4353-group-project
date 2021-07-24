var express = require("express");
const bodyParser = require("body-parser");

const db = require("../models/");
const User_model = db.user;
const Profile_model = db.profile;
// or const {user} = require('../models/')

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.post("/user/:username/profile", bodyParser.json(), (req, res, next) => {
    console.log("Update profile the USER", req.params.username);
    // console.log("all users", users);
    // find user in users[]

    const username = req.params.username

    console.log(req.body);

    const profileBody = req.body.profile

    User_model.findOne({ username: username })
        .exec().then((user) => {
            if (!user) {
                res.status(404).json({ "result": 'no such user' })
                throw { message: "user not found", status: 404 }
            }
            /*
            Model.update(
                {username: username},
                req.body,
                {upsert: true, setDefaultsOnInsert: true}
            );
            */


            // Search to see if profile already exists
            return Profile_model.findOne({
                username: username
            })

        }).then((profile) => {
            if (!profile) {

                console.log("profile not found")
                // if it doesn't, create new profile and save
                var newProfile = new Profile_model({
                    ...profileBody,
                    username: username
                });
                return newProfile.save();
            } else {
                console.log("profile found")
                // if yes, overwrite previous values and save
                profile.overwrite({
                    ...profile.toJSON(),
                    ...profileBody,
                });
                return profile.save()
            }
        }).then((profile) => {
            console.log("saved profile:", profile);

            res.status(200).json({ result: "user updated", profile: profile });
        }).catch((error) => {
            next(error);
        })
});

router.get("/user/:username/address", (req, res, next) => {
    console.log("addrses is", req.params);
    // get username from the url param
    const username = req.params.username;

    return Profile_model.findOne({
        username: username
    }).then((profile) => {
        if (!profile) {
            return res.status(404).json({ result: "no such user" });
        } else {
            res
                .status(200)
                .json({ result: "user address", address: profile });
        }
    }).catch((error) => {
        next(error);
    })

});

//Needed for checks
router.get("/profile/:id", (req, res, next) => {
    console.log("addrses is", req.params);
    const id = req.params.id; //get username from the url param

    return Profile_model.findOne({
        _id: id
    }).then((profile) => {

        if (!profile) {
            return res.status(404).json({ result: "no such user" });
        } else {

            res
                .status(200)
                .json({ result: "user address", address: profile });
        }
    }).catch((error) => {
        res
        .status(500)
        .json({
            error: error.message
        });
    })
})

module.exports = router;
