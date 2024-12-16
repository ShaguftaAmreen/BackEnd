const express= require("express")
const router= express.Router()
const jwt=require("jsonwebtoken")

router.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
   // const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
  });
  

//   router.get("/posts", (req, res) => {
//     res.json(posts.filter((post) => post.username === req.user.name));
//   });
  

router.post("/something",async(req,res)=>{

})




module.exports= router