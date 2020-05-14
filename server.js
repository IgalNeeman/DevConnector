const express = require('express');
const app = express();

app.get('/',(req,res)=>res.send(`Api is running`));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`server is on ${PORT}`));




