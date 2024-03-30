import mongoose from 'mongoose';

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Falha ao conectar MongoDB:", err);
    process.exit(1);
  }
}

export default connectToMongoDB;
