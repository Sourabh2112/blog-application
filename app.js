import express from "express";
import mongoose from "mongoose";
import userouter from "./routes/user-routes.js";
import blogrouter from "./routes/blog-routes.js";
import cookieParser from "cookie-parser";
import { checkAuth } from "./middleware/auth.js";
import staticroute from"./routes/staticroute";
import path from "path";


// mongoose.set("strictQuery", true);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use("/", staticroute);
app.use("/api/user", userouter);
app.use("/api/blog",checkAuth, blogrouter);

mongoose
  .connect(
    "mongodb+srv://sourabh2112:1zAWdA04UFxZA5Uf@cluster0.mwgwel2.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("connected to the detabase and listening to localhost 5000")
  )
  .catch((err) => console.log(err));

//sourabh2112
//1zAWdA04UFxZA5Uf
// blog[i]['title']
// mongodb+srv://sourabh2112:<password>@cluster0.mwgwel2.mongodb.net/?retryWrites=true&w=majority