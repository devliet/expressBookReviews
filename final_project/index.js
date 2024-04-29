 
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

let secret="fingerprint_customer";

app.use("/customer",session({secret:"fingerprint_customer",
resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here

//const authHeader = req.headers['authorization']
const authHeader = session.token;


// const token = authHeader && authHeader.split(' ')[1]
  //const token = authHeader && authHeader.accessToken;
  const token = authHeader;


  if (token == null) return res.sendStatus(401)

  user = jwt.verify(token, secret, (err, user) => {
    
  
    if (err) return res.sendStatus(403)

    req.username = user.data.username
    

    next()
  })
  
});

const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
