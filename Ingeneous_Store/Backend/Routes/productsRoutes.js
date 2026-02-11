import express from 'express';
import{
    createProduct ,
    getProducts,
    updateProduct,
    deleteProduct
} from '../Controllers/productController.js';

const router = express.Router();

//Route to create a new Product
router.post('/add', createProduct);


//Route to get all Products
router.get('/', getProducts);

//Route to update a product by id
router.put('/update/:id', updateProduct);

//Route to delete the product by id 
router.delete('/delete/:id', deleteProduct);


export default router;