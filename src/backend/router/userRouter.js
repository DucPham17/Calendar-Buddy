const express = require("express")
const User = require("../model/userModel");
const { getToken, isAuth } = require("../util");
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
            password: '1234',
            events: []
        })
        console.log(user.events);
        const newUser = await user.save();
        res.send(newUser)
    } catch (error) {
        res.send({ msg: error.message })
    }

})

router.post("/geteventlist", async (req, res) => {
    const dateCheck = new Date(" " + req.body.date)
    console.log(req.body);
    if (dateCheck) {
        const userInfo = await User.findOne({ email: req.body.email });
        const eventListData = userInfo.events;
        //   console.log(eventListData)
        const eventList = []
        for (var i = 0; i < eventListData.length; i++) {
            const date = eventListData[i].startDate;
            if (date.getDay() == dateCheck.getDay()
                && date.getMonth() == dateCheck.getMonth()
                && date.getFullYear() == dateCheck.getFullYear()) {
                eventList.push(eventListData[i]);
            }
        }
        res.send(eventList);
    }
    else {
        res.status(400).send("Invalid date")
    }

})

router.post("/findfreetime", async (req, res) => {
    //  console.log(req.body);
    const year = req.body.date.substring(0, 4);
    const month = req.body.date.substring(5, 7);
    const day = req.body.date.substring(8, 10);
    //console.log(year + " "+ month+" "+day);
    try {
        const user1 = await User.findById(req.body.friendId);
        const user2 = await User.findById(req.body.yourId);
        var busyList = [];
        var timeStamp = [];
        for (let i = 0; i < 24; i++) {
            timeStamp.push([]);
        }
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j++) {
                timeStamp[i].push(0);
            }
        }
        console.log(user1);
        console.log(user2);
        if (user1.name && user2.name) {
            for (let i = 0; i < user1.events.length; i++) {
                //   console.log(user1.events[i].startDate.getDay());
                if (user1.events[i].startDate.getFullYear().toString() == year && user1.events[i].startDate.getMonth() + 1 == month && user1.events[i].startDate.getDate() == day) {

                    const temp = {
                        startHour: user1.events[i].startDate.getHours(),
                        startMin: user1.events[i].startDate.getMinutes(),
                        endHour: user1.events[i].endDate.getHours(),
                        endMin: user1.events[i].endDate.getMinutes()
                    }
                    busyList.push(temp);
                }
            }
            for (let i = 0; i < user2.events.length; i++) {
                if (user2.events[i].startDate.getFullYear() == year && user2.events[i].startDate.getMonth() + 1 == month && user2.events[i].startDate.getDate() == day) {
                    const temp = {
                        startHour: user2.events[i].startDate.getHours(),
                        startMin: user2.events[i].startDate.getMinutes(),
                        endHour: user2.events[i].endDate.getHours(),
                        endMin: user2.events[i].endDate.getMinutes()
                    }
                    busyList.push(temp);
                }
            }
            // console.log(busyList);
            for (let i = 0; i < busyList.length; i++) {
                var startMin = busyList[i].startMin;
                var endMin = busyList[i].startHour == busyList[i].endHour ? busyList[i].endMin : 59;
                for (let j = busyList[i].startHour; j <= busyList[i].endHour; j++) {
                    for (startMin; startMin <= endMin; startMin++) {
                        timeStamp[j][startMin] = 1;
                        if (startMin == 59) {
                            if (j < busyList[i].endHour - 1) {
                                startMin = -1;
                                j++;
                            }
                            else if (j = busyList[i].endHour - 1) {
                                startMin = -1;
                                endMin = busyList[i].endMin;
                                j++;
                            }
                        }
                    }
                }
            }
            var freeList = [];
            //console.log(timeStamp);

            for (let i = 0; i < timeStamp.length; i++) {
                for (let j = 0; j < timeStamp[i].length; j++) {
                    if (timeStamp[i][j] == 0) {
                        let tempTime = {
                            start: i + ":" + j
                        }
                        let tempMin = j;
                        for (let k = i; k < timeStamp.length; k++) {

                            for (let m = tempMin; m < 60; m++) {
                                if (m < 59) {
                                    if (timeStamp[k][m + 1] == 1) {
                                        tempTime.end = k + ":" + m
                                        j = m;
                                        break;
                                    }
                                }
                                else if (m == 59 && k < 23) {
                                    if (timeStamp[k + 1][0] == 1) {
                                        tempTime.end = k + ":" + m;
                                        j = m;
                                        break;
                                    }
                                }
                                else if (m == 59 && k == 23) {
                                    tempTime.end = k + ":" + m;
                                    j = m;
                                    break;
                                }
                            }
                            tempMin = 0;
                            if (tempTime.end != null) {
                                i = k;
                                break;
                            }
                        }
                        freeList.push(tempTime);
                    }
                }
            }
            res.send(freeList);
        }
    } catch (error) {
        res.status(400).send("Invalid user")
    }
})



module.exports = router;