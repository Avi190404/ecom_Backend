import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    wishlist:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        default: []
    },
    cart: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            count: {
                type: Number,
                required: true,
                default: 1,
                min: 1,
            },
            size: {
                type: String,
                required: true,
            }
        }],
        default: []
    },
})

const USERS = mongoose.model("Users", userSchema);

export default USERS;