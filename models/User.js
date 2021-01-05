//part 9 Creating the user model
//בחלק זה אני מגדיר סכימה של הדאטה בייס, יוצר ממנו אבייקט שמכיל שם משתמש אימייל וסיסמה ותמונת אבטר 
//כמו כן מגדיר אותו כיוניק שרק אותו אימייל יכול להירשם רק פעם אחת
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
     type: String, 
     require: true 
        },
  email: {
     type: String, 
     require: true,
      unique: true 
    },
  password: {
     type: String,
      required: true 
    },
  avatar: { 
    type: String 
  },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model('user', UserSchema);
