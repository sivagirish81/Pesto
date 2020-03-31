const express = require("express");
const router = express.Router();
const querystring = require('querystring');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var config = require("config");
// Load input validation
const validateRegisterInput = require("../../../utils/register");
const validateLoginInput = require("../../../utils/login");
// Load User model
const Pesto = require("../../../models/Pesto");

// Generate random number
const getRandomInt = max => {
    max = max || Number.MAX_SAFE_INTEGER;
    return Math.floor(Math.random() * Math.floor(max));
  };

// Check whether tweet exists
const pestoExists = async parameters => {
    console.log(parameters.pestoid);
    const pesto = await Pesto.find({pestoId : Number(parameters.pesto_id)});
    if (pesto.length != 0)
        return true;
    return false;
};

// generate a unique random number for pesto id
const getNewPestoID = async parameters => {
    console.log("HO");
    let Valid = false;
    do
    {
        pestoid = getRandomInt();
        console.log(pestoid);
        if (!(await pestoExists({pesto_id : pestoid})))
            Valid = true;
    }while(!Valid);
    console.log(pestoid);
    return Number(pestoid);
};

// Creates a new Pesto
router.post("/post", (req,res) => {
    var newPesto = new Pesto({
        pestoId : req.body.pestoId,
        posted_by : req.body.posted_by,
        timestamp : req.body.timestamp,
        visible : req.body.visible
    });
    newPesto.save(function(err){
        if (err)
        {
            console.log(err);
            return res.status(400);
        }
    });
    console.log("New Pesto Created Successfully");
    return res.status(200).json({});
});

// List all pestos of a particualr user
// Should be modified to view only pestos made available the user
router.get("/display", async (req,res) => {
    console.log(req.query.name);
    var contents = await Pesto.find({visible : "all"});
    return res.status(200).json(contents);
});
// Can write a method to count the total number of pestos

//Delete a pesto
router.delete("/remove",async (req,res) => {
    var del = await Pesto.deleteMany({pestoid : req.body.pestoId},function(err){
        console.log(err);
        return res.status(400);
    });
    console.log("Removed Successfully");
    return res.status(200).json({});
});

module.exports = router;