import express from "express";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Use Routes
app.use("/posts", postRoutes);

// Redirect to posts page
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Start Server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });