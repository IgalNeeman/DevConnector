//PART 15 Creating The Profile Model

const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: {
    type: String,
    required: true,
  }, 
  /*STATUS: developer junior developers תפקידים */
  skills: { type: [String], required: true },
  /*SKILLS ITS ARRAY DROPDOWN SOMETHING LIKE THAT*/
  bio: { type: String },
  githubusername: { type: String },
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      fieldofstudy: { type: String, required: true },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  social: {
    youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instegram: { type: String }
  },
  date: { type: Date, default: Date.now }
});
// 12.1.2021 .model is a copy of mongoose.Schema: https://mongoosejs.com/docs/models.html 
//ה- מודל הוא העתק של סכימה לפי הדוקומנטציה ולכן לפני שימוש במודל חייבים ליצור אובייקט עם כל הפרמטים שאנחנו רוצים שיהיה שם

module.exports = Profile = mongoose.model("profile", ProfileSchema);