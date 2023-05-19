const AddAdmin = require("../MODELS/user")
const dotenv = require("dotenv")
dotenv.config({ path: "../CONFIG/config.env" })
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../tils/Emails")
const cloudinary = require("../HELPER/cloudinary")

exports.AdminSignUp = async (req, res) => {
    try {
        const { name, email, password, brandname } = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            name,
            email,
            password: hash,
            brandname,
        }

        const createUser = await AddAdmin(data)

        //const { isSuperAdmin, ...others } = createUser._doc

        createUser.isAdmin = true
        const myToken = jwt.sign({ 
            id: createUser._id,
            password: createUser.password,
            IsAdmin: createUser.isAdmin, 
        },
            process.env.JWT_TOKEN, { expiresIn: "1d" })

        createUser.token = myToken
        const checker = await AddAdmin.findOne({ email }); 
        if (checker) {
            res.status(400).json({
                message: "Email already taken.."
            })
        } else {  
            createUser.save()    
            const VerifyLink = `${req.protocol}://${req.get("host")}/api/adminVerify/${createUser._id}`
            //const VerifyLink = `${req.protocol}://safehome.onrender.com/#/verify/${createUser._id}`
            const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
            mailSender({
                email: createUser.email,
                subject: "Kindly verify", 
                message,
            });
  

            res.status(201).json({
                message: "User created",
                data: data
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    } 
} 
 
