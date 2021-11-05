// part 16 -Get Current User Profile
const express = require('express');
const request = require('request'); // part 23 inishilaze request !
const config = require('config'); // part 23 inishilaze config !
const axios = require('axios'); // part 23 inishilaze config !  ** after for fixed beacuse is Deprecated in 2021
// and after that we need to use "npm install axios"
const router = express.Router();
//שים לב למה שכאן Auth , profile , User!!
const auth = require('../../middleware/auth'); //אבטחת מידע
const Profile = require('../../models/Profile'); //ליצירת פרופיל משתמש: תפקידת חברה , לימודים וכו
const User = require('../../models/User'); //ליצירת שם מתשמש אימייל סיסמה רגיל..
const { check, validationResult, body } = require('express-validator');
const { response } = require('express');

const Post = require('../../models/Post')
// @route  GET api/profile/me
// @desc   Get current users profile
// @Access private
router.get('/me', auth, async (req, res) => {
  try {
    //לאחר הייבוא של Profile מהאובייקט שיצרנו במודל, אנחנו נרצה לבדוק\לחפש אם היוזר נמצא ברשימה
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    //אם הוא לא נמצא, אני אחזיר הודעה  שגיאה שהיוזר לא נמצא
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    //אם היוזר נמצא, אני פשוט אשלח את האובייקט שנוצר בחזרה
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error ');
  }
});

//Part 17 - Create & Update profile Routes
// @route  POST api/profile
// @desc   Create or update
// @Access private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is requried').not().isEmpty(),
      check('skills', 'skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //build profile object
    const profileFields = {};
    //console.log("req.user.id",req.user.id);
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    console.log(profileFields.skills);

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //  console.log('profile', profile)
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
// ---- Part 18 Get all profiles & profiles by User ID
// @route  GET api/profile/
// @desc   Get all profiles
// @Access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
// part 18\2
// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @Access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    console.log(' req.params.user_id', req.params.user_id);
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found.' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      //אם שלחנו  ID לא תקין ארוך\קצר תוחזר הודעה שאין פרופיל כזה ב POSTMAN
      //http://localhost:5000/api/profile/user/5f0867a028f3e534e8ea0187-#$%#
      return res.status(400).json({ msg: 'profile not found.' });
    }
    res.status(500).send('server error');
  }
});

// ---- Part 19 Delete profile & User
// @route  DELETE api/profile/
// @desc   Delete profile & User & posts
// @Access Private

router.delete('/', auth, async (req, res) => {
  try {
    //@Remove user posts
    await Post.deleteMany({user:req.user.id})

    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove the user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'user deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// ---- Part 20 Add profile Experience
// @route  PUT api/profile/experience
// @desc   Add profile experience
// @Access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'company is required').not().isEmpty(),
      check('from', 'from date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      // console.log("req.user.id", req.user.id);
      const profile = await Profile.findOne({ user: req.user.id });
      //console.log(profile);
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);
// ---- Part 21 Delete profile  Experience
// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete experience from profile
// @Access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get the remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// ---- Part 22 Add & Delete Profile Education
// @route  PUT api/profile/Education/:exp_id
// @desc   Add Education from profile
// @Access Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'field of study is required').not().isEmpty(),
      check('from', 'from date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get the remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// ---- Part 23 GET Github Repos For profile
// יצרנו פרויקט חדש בהתחלה בגיטהאב בקישור הבא
//https://github.com/settings/applications/
//והעתקנו את המפתח שקיבלנו מגיטהאב לתוך ה- PACKETJSON לפני שכתבנו את התוכנית.

// @route  GET api/profile/github/:username
// @desc   Get user repos from github
// @Access Public
/*  the function is Deprecated !!! in the next code of of router.get i'll fix this 
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
  //    method: 'GET',
    //  headers: {'user-agent':'node.js'}
      const headers  ={
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
      };
    };
    request(options,(err,response,body)=>{
      if(error) console.error(error);
      if(response.statusCode!=200){
        res.status(404).json({msg:"No Github profile found."});

      }
      res.json(JSON.parse(body));
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
*/

router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    return res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'No Github profile found' });
  }
});
module.exports = router;
