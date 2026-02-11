import Address from "../Models/Address.js";

// Adding Address
export const saveAddress = async (req,res) => {
    try{
           const address = await Address.create(req.body);
           res.json({message:"Address saved Successfully", address});
           
    }catch(error){
          res.status(500).json({message:'Error to save Address: ', error});
    }
};



//Get Address by User Id ;
export const getAddresses = async (req,res) =>{
    try{
        const addresses = await Address.find({
            userId: req.params.userId
        })
        res.json(addresses);
    }catch(error){
        res.status(500).json({message: "Error in fetching the addresses: ", error});
    }
}