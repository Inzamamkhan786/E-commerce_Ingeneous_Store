import product from "../Models/Product.js";

//Create a new Prodcuct
export const createProduct = async(req,res) =>{
    try{
        const newProduct = await product.create(req.body); // for creating the product;
        res.json({
            message: 'Product Created Successfully',
            newProduct,
        });
    }catch (error) {
  console.log("CREATE PRODUCT ERROR:", error);
  res.status(500).json({ message: error.message });
}

};



//Get all products
export const getProducts = async(req,res) =>{
    try{
        const {search, category} = req.query;
        let filter = {};

        if(search){
            filter.title = {$regex : search, $options: 'i'};  // Case-insensitive search;
        }

        if(category){
            filter.category = category;
        }


        const products = await product.find(filter).sort({createdAt: -1});
        res.json(products);
    }catch(errro){
        res.status(500).json({message:'Server Error',error});
    }

};


//Update a Product;

export const updateProduct = async (req,res) =>{
    try{
        const updated = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        res.json({
           message: 'Product updated Successfully',
           updated,
        });
    }catch(error){
    res.status(500).json({message:'Server Error',error});
    }
}



//Delete a Product;
export const deleteProduct = async (req,res) =>{
    try{
       await product.findByIdAndDelete(req.params.id);
       res.json({message: 'Product deleted Successfully'});
    }catch(error){
       res.status(500).json({message:'Server Error',error});
    }

};