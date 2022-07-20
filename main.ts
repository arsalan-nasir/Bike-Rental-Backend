const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
import apiRoutes from "./src/controllers";
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

//CONNECTING DATABASE
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Success");
  })
  .catch((err: { message: String }) => {
    console.error(err.message);
    process.exit(1);
  });
//CONNECTING DATABASE ENDED HERE

//GENERATING ROUTES
apiRoutes.forEach((route: any) => {
  app.use(route.baseURL, route.router);
});

app.listen(process.env.PORT, () => {
  console.log(`APP RUNNING ON PORT ${process.env.PORT}`);
});
