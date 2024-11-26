import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
}

export default connectDB;
