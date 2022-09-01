
const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('dotenv').config()


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());


//Routes
app.use("/api/contactDetails" , require("./routes/contactDetailRoute"))
app.use("/api/locationType" , require("./routes/locationTypeRoute"))
app.use("/api/toilet" , require("./routes/ToiletRoute"))
app.use("/api/routes" , require("./routes/RoutesType"))
app.use("/api/routes" , require("./routes/Routes"))
app.use("/api/parking" , require("./routes/parkRoute"))
app.use("/api/user" , require("./routes/userRoute")) 
app.use("/api/savedRoutes" , require("./routes/savedroutesRoute"))
app.use("/api/findings" , require("./routes/FindingsRoute"))
app.use("/api/title" , require("./routes/TitleRoute"))
app.use("/api/parkCapacity" , require("./routes/parkingCapacityRoute"))
app.use("/api/toiletComments" , require("./routes/toiletCommentRoute"))



app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));