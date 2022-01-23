const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const departmentModel = require("../model/department")

/** Get all department details */
router.get("/", async(req, res) => {
    const departmentList = await departmentModel.find();
    if (departmentList.length === 0) {
        return res.json({ message: "There is no any department exist!" })
    }
    return res.json({ data: departmentList });
});

/** Insert departmet details */
router.post("/", (req, res) => {
    const newDepratment = req.body;
    departmentModel.create(newDepratment);
    return res.json({ message: "Department added successfully" });
});

/** Update Department */
router.put("/:name", async(req, res) => {
    /** Take parameter name */
    const name = req.params.name;
    const departmentName = req.body.name;

    const departmentList = await departmentModel.find({ "name": name })

    if (departmentList.length < 1) {
        return res.json({ "Message": "Sorry no data found of department name " + name })
    }
    departmentModel.findByIdAndUpdate(departmentList[0]._id, { name: departmentName }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
});

/** Delete Department */
router.delete("/:name", async(req, res) => {
    const name = req.params.name;

    /** Delete department list by department Name */
    departmentModel.deleteMany({ "name": name }).then(function() {
        return res.send("Data deleted"); // Success
    }).catch(function(error) {
        return res.send(error); // Failure
    });
});

module.exports = router