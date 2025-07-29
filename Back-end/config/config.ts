import mongoose from 'mongoose';

// const MONGO_URL = ;

export const CONNECT = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb+srv://hyderdanish369:ham12Assi@cluster0.gyqcemy.mongodb.net/lostfound?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", (error as Error).message);
  }
};
export default CONNECT;