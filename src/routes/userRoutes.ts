import { Router, Request, Response } from "express";
import USERS from "../schema/userSchema";
import { signToken } from "../utils/jwtutils";
import bcrypt from "bcryptjs";

const router = Router();

router.get("/users", async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await USERS.find({});
        res.status(200).json(users);
        return;
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body;

        const user = await USERS.findOne({ email: body.email });
        if(user){
            res.status(400).json({ message: "User with that email already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = new USERS({
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = signToken(newUser._id.toString());
        res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
        return;
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})

router.post("/login", async (req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body;

        const user = await USERS.findOne({ email: body.email });
        if(!user){
            res.status(400).json({ message: "No User Exsist! Try SignUp First" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if(!isPasswordValid){
            res.status(400).json({ message: "Invalid Password" });
            return;
        }

        const token = signToken(user._id.toString());
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return;
    }
})


export default router;