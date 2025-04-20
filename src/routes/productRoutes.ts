import { Request, Response, Router } from "express";
import PRODUCTS from "../schema/productSchema";

const router = Router();

router.get("/products", async (req: Request, res: Response): Promise<void> => {
    try{
        const products = await PRODUCTS.find({});
        res.status(200).json(products);
        return;
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.post("/product", async (req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body;
        const name = body.name;
        const product = await PRODUCTS.findOne({ name });
        if(product){
            res.status(400).json({ message: "Product with that name already exists" });
            return;
        }

        const newProduct = new PRODUCTS(body);
        await newProduct.save();
        res.status(201).json(newProduct);
        return;
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.get("/product/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id;
        
        const product = await PRODUCTS.findById(id);
        if(!product){
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json(product);
        return;
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.put("/product/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id;
        const body = req.body;

        const product = await PRODUCTS.findByIdAndUpdate(id, body, { new: true });
        if(!product){
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json(product);
        return;
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.delete("/product/:id", async (req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id;

        const product = await PRODUCTS.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.status(200).json({ message: "Product deleted" });
        return;
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

export default router;
