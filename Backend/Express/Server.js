let express = require("express");
let r = require("./Routing/Route");
let room_route = require("./Routing/Roomrouter");

let db = require("./Connect");
let user = require("./Models/Usermodel");
let cors = require("cors");
require("dotenv").config();

const app = express();
const roomRouter = require("./Routing/Roomrouter"); // adjust the path if needed
const bodyParser = require('body-parser');
const staff = require('./Routing/Staffroute'); //replace with your actual model file
const bookingRoutes = require('./Routing/Bookingroute');
let eedback= require('./Routing/Feedbackroute');

app.use(express.json());



let PORT = process.env.PORT || 3007;


app.use(cors());
app.use("/Web/", r);
app.use("/room/", room_route);
app.use("/staff/",staff )
app.use('/booking', bookingRoutes);
app.use('/feeback/', eedback);

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());




db().then(() => {
    // Uncomment if you want to run once
    // add_user();
    // add_room();

    app.listen(PORT, () => {
        console.log(`Server Started at http://localhost:${PORT}/Web/`);
    });
}).catch((e) => {
    console.log("Database connection error:", e.message);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });



