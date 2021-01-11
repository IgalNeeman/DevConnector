## Full Stack project - MERN Stack Front To Back.

## הסבר על הפרויקט בקצרה מה בוצע בכל שלב:

# Section1: Environment & Setup:
- מורידים POSTMAN בשביל לבצע בדיקות API
- React Developer Tools כרום אקסטנשן בשביל לעשות בדיקות לריאקט
- התקנה של תוסף לויזואל סטודיו Bracket Pair Colorizer שיסדר לי את הקוד קצת במחינת נראות
- התקנת של תוסף נוסף לויזואל קוד ES7\React\Redux\GrashQL\React-neative snippets
- Prettier - code formatter התקנה של

# Section2: Express & MongoDB Setup
- a שלב ראשון נכנסים לאתר של https://MONGODB.com
- נרשמים שם, ויוצרים יוזר ל דאטה בייס
- מעתיקים את המחרוזת עם השם משתמש וסיסמה שלנו לדאטה בייס ושומרים אותה אצלנו לשימוש בעתיד בפרויקט

## b. Install Dependencies & Basic Express Setup
- שלב ראשון יוצרים קובץ .gitignore node_modules/
- git init
- npm init ויוצרים את כל החבילה של הפרויקט מגדירים אותו.
- נבצע התקנות של חבילות בתוך הפרויקט שלנו:
- npm i express express-validator bcryptjs config gravatar jsonwebbtoken mongoose request
- npm i -D nodemon concurrently

* ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) `מכאן מתחיל תהליך בניית הקבצים בפרויקט` ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+)

## c. Connecting To MongoDB With Mongoose:
- Create Folder DevConnector/config/
- https://github.com/IgalNeeman/DevConnector/blob/master/config/default.json הגדרה של קובץ הלוגין לדאטה בייס
- https://github.com/IgalNeeman/DevConnector/blob/master/config/db.js פונקציית הרשמה לדאטה בייס
- coonectDB(); -> https://github.com/IgalNeeman/DevConnector/blob/master/server.js OK

## d. Routes Files With Express Router
- Create Folder DevConnector/routes/api/
- Create 4 files inside routes/api auth.js posts.js profile.js users.js
- example in files: https://github.com/IgalNeeman/DevConnector/tree/master/routes/api

# Section3: User API Routes & JWT Authentication
## 9. Creating The User Model
- Create Folder models: DevConnector/models/
- Create file User.js
- https://github.com/IgalNeeman/DevConnector/blob/master/models/User.js

## 10. Request & Body Validation
- https://github.com/IgalNeeman/DevConnector/blob/master/routes/api/users.js

## 11. User Registration
- See if the user exists
- Get users gravatar
- Encrypt password
- Return jsonwebtoken
- https://github.com/IgalNeeman/DevConnector/blob/master/routes/api/users.js

## 12. Implementing JWT
- https://github.com/IgalNeeman/DevConnector/blob/master/routes/api/users.js

## 13. Custom Auth Middleware & JWT Verify
- Get token from header
- Check if not token
- Verify token
- https://github.com/IgalNeeman/DevConnector/blob/master/middleware/auth.js
- Get api/auth
- Method: [GET] in Postman http://localhost:5000/api/auth
- https://github.com/IgalNeeman/DevConnector/blob/master/routes/api/auth.js

## 14. User Authentication / Login Route
@route POST api/auth
@desc Authentication user & get token
@access Public

- Invalid Credentials
- https://github.com/IgalNeeman/DevConnector/blob/master/routes/api/auth.js

# Section4: Profile API Routes
## 15. Creating The Profile Model
- https://github.com/IgalNeeman/DevConnector/blob/master/models/profile.js


[Google](https://google.com" target="_blank)
