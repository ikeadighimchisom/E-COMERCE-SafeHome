const express = require("express")
const {signUpUser,UserVerify,UserForGetPassword,UserChangePassword,logOut} = require("../CONTROLLER/user")

const Router = express.Router();


//Router.route('/login').post(login)
Router.route('/sign').post(signUpUser)
 Router.route('/userForget').post(UserForGetPassword)
 Router.route('/userChng/:id').post(UserChangePassword)
// Router.route('/userVerify').post(UserVerify)
 Router.route('/logout/:id').post(logOut)
//Router.route("/admin").get(GetallUser)
module.exports = Router; 
 