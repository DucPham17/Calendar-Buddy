const express = require("express")
const Event = require("../model/eventModel")
const {isAuth} = require("../util");
const User = require("../model/userModel");
const router = express.Router();

router.post("/createevent", async (req,res) => {
    if(isAuth){
        const startDate = new Date(req.body.startDate+"T"+req.body.startTime+":00");
        const endDate = new Date(req.body.startDate+"T"+req.body.endTime+":00");
        if(endDate - startDate > 0){
            const event = new Event({
                title : req.body.title,
                startDate: startDate,
                endDate : endDate
            })
            if(event){
                const user = await User.findOne({email: req.body.email});
                var eventList = user.events;
                eventList.push(event);
                await User.findOneAndUpdate({email: req.body.email},{events: eventList});
                console.log(event);
                res.send({
                    title: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate
                });
            }
            
        }
        else{
            res.status(400).send("Invalid input");
        }      
    }
    else{
        res.status(401).send("Please Sign In!");
    }
})

module.exports = router;