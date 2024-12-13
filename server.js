require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const { connect, config } = require("./config/config");
const signUpModel = require("./models/signup");
const authenticateToken = require("./middleware/auth");
const customerRouter = require("./routes/customer.routes");

const app = express();


app.use(cors());
app.use(express.json());


connect();


const posts = [
  { username: "Kyle", title: "post 1" },
  { username: "Alice", title: "post 2" },
];


app.use("/customer", customerRouter);

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.get("/", (req, res) => {
  res.send("MongoDB connected");
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  if (!name || !email || !password || !confirmpassword) {
    return res.status(400).send("All fields are required.");
  }

  if (password !== confirmpassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    const signup = new signUpModel({ name, email, password });
    await signup.save();
    res.status(201).send(`User ${name} signed up successfully!`);
  } catch (error) {
    res.status(500).send(`Error signing up: ${error.message}`);
  }
});


app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});



// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const user = { name: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// });





// app.post("/api/login", async (req, res) => {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).send("Email and password are required.");
//     }

//     try {
//       // Find the user in the database by email
//       const user = await signUpModel.findOne({ email });

//       // If user is not found
//       if (!user) {
//         return res.status(404).send("User not found.");
//       }

//       // Check if the password matches
//       if (user.password !== password) {
//         return res.status(401).send("Invalid credentials.");
//       }

//       // Success response
//       res.status(200).send(`Welcome back, ${user.name}!`);
//     } catch (error) {
//       // Handle server errors
//       res.status(500).send(`Error logging in: ${error.message}`);
//     }
//   });
