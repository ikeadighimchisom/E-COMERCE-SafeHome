const express = require("express")
const {MachantSignUp,Login,MachantVerify,Forgotpassword,passwordchange,isMachantVerify, UpdateUsers} = require("../CONTROLLER/admin")
const { isMachant} = require("../HELPER/athu");

const Router = express.Router();

Router.route('/Login').post(Login)
 Router.route('/machantSignUp').post(MachantSignUp)
Router.route('/Verify/:Id').post(MachantVerify)
Router.route('/confirmMachant/:Id').post(isMachantVerify)
Router.route('/Forget').post(Forgotpassword)
Router.route('/Chng/:id').post(passwordchange)
Router.route("/updateFile/:id").patch(UpdateUsers)
// Router.route("/update/:userid").patch(UpdateUsers)
// Router.route('/adminChng/:id/:token').post(passwordchange)
module.exports = Router;

  