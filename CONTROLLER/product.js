const Addfurni = require('../MODELS/productModel')
//const Cat = require("../models/CateModle")
const AddAdmin = require("../MODELS/Admin")
const cloudinary = require("../HELPER/cloudinary");
const { search } = require('../ROUTE/ProductInStock');

exports.NewPro = async (req, res) => {
    try {
        const theAdmin = req.params.Id;
        const admin = await AddAdmin.findById(theAdmin)
        // const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{folder:"product"});
        const fruniData = {
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url,
            cloudId: result.public_id,   
            price: req.body.price,
            category: req.body.category,
            stockQuantity: req.body.stockQuantity,
            rating: req.body.rating,
            brandName: req.body.brandName,
        }
        const created = await Addfurni(fruniData)
        await created.save();
        if (admin && Array.isArray(admin.product)) {
            // await created.save();
            admin.product.push(created);
            await admin.save();
        }
        res.status(201).json({
            message: "Furniture item created successfully",
            furniture: created
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}
exports.GetallFurni = (async (req, res) => {
    try {
        const user = req.params.id;
        const allFurni = await Addfurni.find(user);
        res.status(201).json({
            message: "Allfurni",
            length: allFurni.length,
            data: allFurni
        });

    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}
)
//asyncHandler(
exports.GetSingle  = async (req, res) => {
    try {
        const proId = req.params.proId;
        const allFurni = await Addfurni.findById(proId);
        // console.log(allFurni)
        if (allFurni) {
            res.status(201).json({
                message: "Allfurni",
                //length: allFurni.length,
                data: allFurni
            });
        } else {
            res.status(404).json({
                message: "No furniture in the database"
            })
        }

    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}



exports.DeleteFurni = async (req, res) => {
    try {
        const productid = req.params.productid
        await Addfurni.deleteOne({ _id: productid });
        //console.log(productid)
        res.status(200).json({
            message: "Deleted",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


// exports.UpdateFurni = asyncHandler(async (req, res) => {
//     try {
//         const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
//         const id = req.params.id;
//         const productId = await Addfurni.findById(id)
//         const newUpdate = {
//             title: req.body.title,
//             description: req.body.description,
//             image: result.secure_url,
//             cloudId: result.public_id, 
//             price: req.body.price,
//             stockQuantity: req.body.stockQuantity,  
//             brandName: req.body.brandName,
//         }
//         const reviewFurni = await Addfurni.findByIdAndUpdate(productId, newUpdate);
//         res.status(201).json({
//             message: "update was successful",
//             data: reviewFurni
//         }); 
//     } catch (err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// }
// )
exports.UpdateFurni = async (req, res) => {
    try {
        let updateFields = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity
        };
        if (req.files && req.files.image) {
            const id = req.params.id
            const blog = await Addfurni.findById(id);
            // console.log(blog)
            await cloudinary.uploader.destroy(blog.cloudId)
            // await fs.unlinkSync(blog.image)
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath
            );
            updateFields.image = result.secure_url;
            updateFields.cloudId = result.public_id;
        }
        const productId = req.params.id;
        const updatedProduct = await Addfurni.findByIdAndUpdate(
            productId,
            updateFields,
            { new: true }
        );

        res.status(201).json({
            message: "update was successful",  
            data: updatedProduct
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};




// //getProductByCategorygory
// exports.GetCategoryByProduct = async (req, res) => {
//     try {
//       const category = req.query.category ? { category: req.query.category } : {};
//       const products = await Addfurni.find(category);
//       res.status(200).json({
//         message: "All Furni By Category",
//         length: products.length,
//         data: products,
//       });
//     } catch (e) {
//       res.status(400).json({
//         message: e.message,
//       });
//     }
//   };



exports.GetCategoryByProduct = async (req, res) => {
    try{
        const search = await Addfurni.find({
            "$or":[
                 {category:{$regex:req.params.key}}
            ],
    })
        res.status(200).json({
            message: "Category is Selected",
            data: search
        })
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
    
  };


exports.SearchName = async(req, res) => {
    try{
        const search = await Addfurni.find({
            "$or":[
                {title:{$regex:req.params.key}},
                {description:{$regex:req.params.key}},
                {brandName:{$regex:req.params.key}}
            ],
    })
        res.status(200).json({
            message: "Search is Done",
            data: search
        })
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}