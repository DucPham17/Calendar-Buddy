const express = require("express")
const User = require("../model/userModel");
const { getToken } = require("../util");
const router = express.Router();

router.post("/signin", async (req, res) => {
  //  console.log(req.body);
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    
    // console.log(signinUser)
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            event: signinUser.event,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send("Invalid email or password")
    }
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Duc Pham',
            email: 'ducmpham17@augustana.edu',
            password: '1234'
        })

        const newUser = await user.save();
        res.send(newUser)
    } catch (error) {
        res.send({ msg: error.message })
    }

})

module.exports = router;