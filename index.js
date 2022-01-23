require('dotenv').config();
const express = require('express');
const app = express();

/** Include mongoose. For using MongoDB. It will create using "npm -i mongoose*/
const mongoose = require('mongoose');

/** Allocate PORT 3000 on local server or get server PORT from external */
const port = process.env.PORT || 3000;

/** For access JSON  */
// app.use(express.json());

/** Use Routing */
// app.use(express.Router());
app.use(express.json());
app.use(express.Router());

/** Default URL */
app.get('/', (req, res) => res.send('<h1 style="text-align:center">Welcome to Employee Registration Portal</h1>'));

/** Use Department Route */
const departmentRoutes = require('./routes/Department');
app.use('/department', departmentRoutes);

/** Use Department Route */
const employeeRoutes = require('./routes/Employee');
app.use('/employee', employeeRoutes);

/** MongoDB Connection */
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("MongoDB connected successfully"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));