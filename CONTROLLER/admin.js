const AddMachant = require("../MODELS/Admin")
const dotenv = require("dotenv")
dotenv.config({ path: "../CONFIG/config.env" })
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../tils/Emails")
const cloudinary = require("../HELPER/cloudinary")
const { isSuperAdmin } = require("../HELPER/athu")
const Addfurni = require ("../MODELS/productModel")
const Order = require("../MODELS/OrderproductModel")

// exports.MachantSingUp = async (req, res) => {
//     try {
//         const { name, email, password, brandname } = req.body
//         const salt = bcryptjs.genSaltSync(10);
//         const hash = bcryptjs.hashSync(password, salt);

//         const data = {
//             name,
//             email,
//             password: hash,
//             brandname,
//         }

//         const createUser = new AddMachant(data)

//         const { isSuperAdmin, ...others } = createUser._doc

//         createUser.isMachant = true
//         const myToken = jwt.sign({ 
//             id: createUser._id,
//             password: createUser.password,
//             IsMachant: createUser.isMachant, 
//         },
//             process.env.JWT_TOKEN, { expiresIn: "1d" })
 
//         createUser.token = myToken
//         const checker = await AddMachant.findOne({name,email});
//         if (checker) {
//             res.status(400).json({
//                 message: "Email already taken.."
//             })
//         } else {  
//             createUser.save()    
//             const VerifyLink = `${req.protocol}://${req.get("host")}/api/adminVerify/${createUser._id}`
//             //const VerifyLink = `${req.protocol}://safehome.onrender.com/#/verify/${createUser._id}`
//             const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
//             mailSender({
//                 email: createUser.email,
//                 subject: "Kindly verify", 
//                 message,
//             });
  

//             res.status(201).json({
//                 message: "User created",
//                 data: data
//             });
//         }
//     } catch (err) {
//         res.status(400).json({
//             message: err.message
//         });
//     } 
// } 
 

exports.MachantSignUp = async(req, res) => {
    try{
        const {name, email, password,brandname} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            name,   
            email,
            password: hash,
            brandname, 
        }
        const createUser = new AddMachant(data)
        createUser.isMachant = true; 
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
             IsMachant:createUser.isMachant},
              process.env.JWT_TOKEN,{expiresIn: "1d"})
              
            createUser.token = myToken;
            const checker = await AddMachant.findOne({name,email});
            if(checker){
                res.status(200).json({
                    message: "Email already taken"
                })
            }else{
           await createUser.save()

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/AdminVerify/${createUser._id}`
            const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
            mailSender({
            email: createUser.email,
            subject: "Kindly verify",
            message,
            });

             res.status(201).json({
                message: "User created",
                data: createUser
             });

            }
      } catch(err) {
            res.status(400).json({
            message: err.message
        });
    }
}



exports.Login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const checkEmail = await AddMachant.findOne({email:email})
        if(!checkEmail) return res.status(404).json({
            message: " Email Not found"
        })
        const isPassword = await bcryptjs.compare(password, checkEmail.password)
        if(!isPassword) return res.status(404).json({message: "Email or password incorrect"})

        const myToken = jwt.sign({
            id:checkEmail._id,
            password: checkEmail.password,
            IsMachant:checkEmail.isMachant,
            IsSuperAdmin:checkEmail.isSuperAdmin},  process.env.JWT_TOKEN ,{expiresIn: "1d"})

            checkEmail.token = myToken 
            await checkEmail.save()
            res.status(201).json({
            message:"Successful",
            data:checkEmail
         })
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}
exports.MachantVerify = async (req, res) => {
    try {
        const machantId = req.params.Id
        const user = await AddMachant.findById(machantId)
        await AddMachant.findByIdAndUpdate(
            user._id,
            {
                verify: true
            },
            {
                new: true
            }
        )

        // user.Verify = true,
        // await user.save()

        res.status(200).json({
            message: `thanks ${user.name} for verifying your account`
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.Forgotpassword = async (req, res) => {
    try {
        const { email } = req.body
        const userEmail = await AddMachant.findOne({ email })
        if (!userEmail) {
            res.status(404).json({ message: "No Email" })
        } else {
            const myToken = jwt.sign({
                id: userEmail._id,
                IsMachant: userEmail.isMachant,
                isSuperAdmin: userEmail.isSuperAdmin
            }, process.env.JWT_TOKEN, { expiresIn: "1m" })

            //const VerifyLink = `${req.protocol}://safehome.onrender.com/#/resetpassword/${userEmail._id}` 
            const VerifyLink = `${req.protocol}://${req.get("host")}/api/changepassword/${userEmail._id}/${myToken}`
            const message = `Use this link ${VerifyLink} to change your password`;
            mailSender({
                email: userEmail.email,
                subject: "Reset Pasword",
                message,
            })
      
            res.status(202).json({
                message: "email have been sent"
            })

            // console.log(userEmail);
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


exports.passwordchange = async (req, res) => {
    try {
        const { password } = req.body;
        const id = req.params.id;
        const users = await AddMachant.findById(id);
        const saltPwd = await bcryptjs.genSalt(10);
        const hassPwd = await bcryptjs.hash(password, saltPwd);
        await AddMachant.findByIdAndUpdate(users._id, {
            password: hassPwd
        },
            {
                new: true
            })
        res.status(200).json({
            message: "Successfully changed..."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

// exports.isMachantVerify=  async (req, res) => {
//     try {
//         const userid = req.params.userid
//         const user = await AddMachant.findById(userid)
//         await AddMachant.findByIdAndUpdate(
//             user._id,
//             {
//                 isMachant: true
//             },
//             {
//                 new: true
//             }
//         )

//         res.status(200).json({
//             message: "Machant Confirmed"
//         })
//     } catch (e) {
//         res.status(401).json({
//             message: e.message
//         })
//     }
// }

exports.isMachantVerify = async (req, res) => {
    try {
      const userid = req.params.userid;
      const user = await AddMachant.findById(userid);
  
      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return; // Exit the function early
      }
  
      await AddMachant.findByIdAndUpdate(
        user._id,
        {
          isMachant: true,
        },
        {
          new: true,
        }
      );
  
      res.status(200).json({
        message: "Merchant Confirmed",
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };
  

exports.UpdateUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = await AddMachant.findById(id)
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const { name, email, password, brandname } = req.body
        const newUpdate = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: result.secure_url,
            brandname: req.body.brandname,
            cloudId: result.public_id,
        }
        const Update = await AddMachant.findByIdAndUpdate(userId, newUpdate);
        res.status(201).json({
            message: "update was successful",
            data: Update
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}



exports.SuperAdminSignUp= async(req, res) => {
    try{
        const {name, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            name,
            email,
            password: hash,
        }
        const createUser = new AddMachant(data)
        createUser.isSuperAdmin = true;
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
             IsMachant:createUser.isMachant,
            IsSuperAdmin:createUser.isSuperAdmin},
              process.env.JWT_TOKEN,{expiresIn: "1d"})
              
            createUser.token = myToken,
            createUser.save()

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/userVerify/${createUser._id}`
            const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
            mailSender({
            email: createUser.email,
            subject: "Kindly verify",
            message,
            });


             res.status(201).json({
                message: "SuperAdmin created",
                data: createUser
             });
      } catch(err) {
            res.status(400).json({
            message: err.message
        });
    }
}

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await AddMachant.find().where({ "isMachant": false});
        res.status(200).json({
            message: "All Users" + allUsers.length,
            data: allUsers
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        }) 
    } 
}

// get Single User/Admin

exports.getOne = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Retrieve the merchant's details
      const singleAdmin = await AddMachant.findById(userId).populate("Product");
  
      res.status(201).json({
        message: "User Is Found Successful",
        data: {
          merchant: singleAdmin,
        },
      });
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  };
  
// get only user
exports.getAllMachants = async (req, res) => {
    try {
        const allMachant = await AddMachant.find().where({ "isMachant": true })
        res.status(200).json({
            message: "All Machants" + allMachant.length,
            data: allMachant
        })
    } catch (error) { 
        res.status(400).json({
            message: error.message
        })
    }
}

// delete all users
exports.deleteUser = async(req,res)=>{
    try {
        const Id = req.body.Id;
        const user = await AddMachant.findById(Id);
        await AddMachant.deleteOne(Id, user);
        res.status(200).json({
            message: "Deleted successfully..."
        })
    } catch (error) {  
        res.status(400).json({
            message: error.message
        })
    }
};




exports.getMachantOrders = async (req, res) => {
    try {
      const machantId = req.params.machantId;
  
      // Find the merchant
      const machant = await AddMachant.findById(machantId);

      // Find the orders placed on the merchant's products
      const orders = await Order.find({ Product: { $in: machant.Product } })
        .populate('Product')
        .populate('AddUser');
  
      res.status(200).json({
        message: 'Merchant orders retrieved successfully',
        orders: orders,
      });
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  };