import mongoose from "mongoose";
let isConnected = false;
export const dbConnect = async () => {
  if (isConnected) {
    console.log("Mongo is already connected");
    return;
  }
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      isConnected = true;
      console.log("Mongo Connected");
    }
  } catch (error) {
    console.log(error);
  }
};
