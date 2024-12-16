require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect, config } = require("./config/config");
const authenticateToken = require("./middleware/auth");
const customerRouter = require("./routes/customer.routes");
const signUpRouter = require("./routes/signup.routes"); 

const app = express();

app.use(cors());
app.use(express.json());

connect();

const posts = [
  { username: "Kyle", title: "post 1" },
  { username: "Alice", title: "post 2" },
];

app.use("/customer", customerRouter);
app.use("/api", signUpRouter); 

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.get("/", authenticateToken, (req, res) => {
  res.send(`MongoDB connected ${req.user.name}`);
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});



// app.get("/", (req, res) => {
//   res.send(`MongoDB connected `);
// });




// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const user = { name: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// });






