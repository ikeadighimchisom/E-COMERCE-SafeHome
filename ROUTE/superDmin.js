const express = require("express");

const { getAllUsers,allUser, SuperAdminSignUp, getAllMachants, getOne, deleteUser} = require("../CONTROLLER/admin");
const { isSuperAdmin} = require("../HELPER/athu");
//const { isMachant} = require("../HELPER/athu")

const superRoutes = express.Router();

superRoutes.route("/super").post(SuperAdminSignUp);
superRoutes.route("/allUsers/:userId").get( getAllUsers)
superRoutes.route("/alladmin/:userId").get( getAllMachants );
superRoutes.route("/OneUser/:userId").get( getOne)
//superRoutes.route("/alluser/:superId").get(IsSuperAdmin, allUser);
superRoutes.route("/deluser/:Id/:userId").delete( deleteUser);
 
module.exports = superRoutes


 



