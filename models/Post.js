// Section 5 - Part 24 Create The post model

/// בחלק הזה מה שעשיתי בעצם זה בשביל שהמשתמש בסך הכל יוכל לכתוב פוסט,
// ללחוץ לייק ולהוריד לייק - בדיוק כמו בפייסבוק
//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Post = mongoose.model('post',PostSchema);
