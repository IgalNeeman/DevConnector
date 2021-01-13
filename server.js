const express = require('express');
const app = express();
const connectdb = require('./config/db');

// connect database
connectdb();
//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send(`Api is running`));

app.use('/api/users', require('./routes/api/users')); //route/api/users מבצע הרשמה של יוזר חדש במערכת-
app.use('/api/profile', require('./routes/api/profile')); //קבלת מידע ועדכון מידע לימודים\עבודה על הפרופילים כולל מחיקת משתמשים
app.use('/api/posts', require('./routes/api/posts')); //קבלה\מחיקה של פוסט לייקים ותגובות לפוסט
app.use('/api/auth', require('./routes/api/auth')); //בדיקות ולידציה\אבטחה למשתמש

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is on ${PORT}`));
