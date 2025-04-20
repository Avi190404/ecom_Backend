import { Router, Request, Response } from "express";
import USERS from "../schema/userSchema";

const router = Router();

router.post("/wishlist", async (req:Request, res:Response): Promise<void> => {
    try{
        const { productId, userId } = req.body;
        if(!productId || !userId){
            res.status(400).json({ message: "Product ID and User ID are required" });
            return;
        }

        const user = await USERS.findById(userId);
        if(!user){
            res.status(404).json({ message: "User not found" });
            return;
        }
        if(user.wishlist.includes(productId)){
            res.status(400).json({ message: "Product already in wishlist" });
            return;
        }
        user.wishlist.push(productId);
        await user.save();
        res.status(200).json({ message: "Product added to wishlist" });
        return;

    }catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
})

router.get("/wishlist", async (req:Request, res:Response): Promise<void> => {
    try{
        const { userId } = req.body;
        if(!userId){
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const user = await USERS.findById(userId).populate("wishlist");
        if(!user){
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user.wishlist);
        return;
    }catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
})

router.post("/wishlist/remove", async (req:Request, res:Response): Promise<void> => {
    try{
        const { productId, userId } = req.body;
        if(!productId || !userId){
            res.status(400).json({ message: "Product ID and User ID are required" });
            return;
        }
        const user = await USERS.findById(userId);
        if(!user){
            res.status(404).json({ message: "User not found" });
            return;
        }
        if(!user.wishlist.includes(productId)){
            res.status(400).json({ message: "Product not in wishlist" });
            return;
        }
        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        await user.save();
        res.status(200).json({ message: "Product removed from wishlist" });
        return;
    }catch(err){
        res.status(500).json({message: "Internal server error"});
        return;
    }
})

export default router;