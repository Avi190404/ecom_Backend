import mongoose from "mongoose";

const connectToDb = async () => {
    const dbUri : string = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
    mongoose.connect(dbUri)
    .then(() => console.log("MongoDb Connected."))
    .catch((err:any) => console.log(err))
}

export default connectToDb;