const express = require("express");

const { getAllUsers,allUser, SuperAdminSignUp, getAllMachants, getOne, deleteUser} = require("../CONTROLLER/admin");
const { isSuperAdmin} = require("../HELPER/athu");
//const { isMachant} = require("../HELPER/athu")

const superRoutes = express.Router();

superRoutes.route("/super").post(SuperAdminSignUp);
superRoutes.route("/allUsers/:userId").get( isSuperAdmin, getAllUsers)
superRoutes.route("/alladmin/:userId").get( isSuperAdmin, getAllMachants );
superRoutes.route("/SingleUser/:Id").get( getOne)
//superRoutes.route("/alluser/:superId").get(IsSuperAdmin, allUser);
superRoutes.route("/deluser/:Id/:userId").delete( deleteUser);
 
module.exports = superRoutes


 



