const express = require("express");
const app = express();
const connectdb = require("./config/db");

// connect database
connectdb();
//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send(`Api is running`));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is on ${PORT}`));
