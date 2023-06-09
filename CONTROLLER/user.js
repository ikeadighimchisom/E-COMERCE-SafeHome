const User = require("../MODELS/Admin");
const dotenv = require("dotenv");
dotenv.config({ path: "../CONFIG/config.env" });
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../tils/Emails");

exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    const data = {
      name,
      email,
      password: hash,
    };
    const createUser = new User(data);
    const myToken = jwt.sign(
      {
        id: createUser._id,    
        password: createUser.password,
        isMachant: createUser.isMachant,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    createUser.token = myToken;
    const checker = await User.findOne({ email });
    if (checker) {
      return res.status(400).json({
        message: "Email already taken..",
      });
    } else {
      await createUser.save();
      const VerifyLink = `${req.protocol}://${req.get(
        "host"
      )}/api/userVerify/${createUser._id}`;
      const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;

      mailSender({
        email: createUser.email,
        subject: "Kindly verify",
        message,
      });

      return res.status(201).json({
        message: "User created",
        data: createUser,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// exports.UserVerify = async (req, res) => {
//     try {
//         const userid = req.params.userid
//         const user = await realUser.findById(userid)
//         await realUser.findByIdAndUpdate(
//             user._id,
//             {
//                 verify: true
//             },
//             {
//                 new: true
//             }
//         )

//         res.status(200).json({
//             message: "you have been verified"
//         })

//     } catch (err) {
//         res.status(400).json({
//             message: err.message
//         })
//     }
// }

exports.UserForGetPassword  = async (req, res) => {
    try{
        const {email} = req.body
        const userEmail = await realUser.findOne({email})
        if(!userEmail) return  res.status(404).json({ message: "No Email" })
        const myToken = jwt.sign({
            id:userEmail._id,
            IsMachant:userEmail.isMachant,
            IsSuperAdmin:userEmail.isSuperAdmin}, 
            process.env.JWT_TOKEN, 
            {expiresIn: "1m"})

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/changepassword/${userEmail._id}/${myToken}`
        //const VerifyLink = `${req.protocol}://https://safehome.onrender.com/#/resetpassword/${userEmail._id}`
        const message = `Use this link ${VerifyLink} to change your password`;
        mailSender({
          email: userEmail.email,
          subject: "Reset Pasword",
          message,
        })
        
        res.status(202).json({
            message:"email have been sent"
        })

        // console.log(userEmail);
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}




exports.UserChangePassword= async (req, res) => {
    try {
        const { password } = req.body;
        const id = req.params.id;
        const users = await realUser.findById(id);
        const saltPwd = await bcryptjs.genSalt(10);
        const hassPwd = await bcryptjs.hash(password, saltPwd);
        await realUser.findByIdAndUpdate(users._id, {
            password: hassPwd
    
        },
            {
                new: true
            })
        res.send("Successfully changed...")
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.logOut = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { email, password } = req.body;
        const genToken = jwt.sign({
            userId,
            email,
            password
        }, process.env.JWTDESTROY);
        realUser.token = genToken;
        res.status(200).json({
            message: "successfully logged out"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message

        })
    }
}