
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');

const users = require("./routes/api/users");
const transactions = require("./routes/api/transactions");
const messages = require("./routes/api/messages");

const app = express();

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());   

//BodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//DB config
// const db = require('./config/keys').mongoURI;

const db="mongodb+srv://harshpreetss524:Harsh@5949@cluster0.yvla1rn.mongodb.net/mernbankingsystem?retryWrites=true&w=majority";

//Connect to DB
mongoose.connect(
    db,
    { useNewUrlParser: true,
       useUnifiedTopology:true,
       useFindAndModify:false,    
    }
)
.then(() => console.log("MongoDB succesfully connected"))
.catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/transactions", transactions);
app.use("/api/messages", messages); 


// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));