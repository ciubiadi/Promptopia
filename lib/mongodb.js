// hook up to the database
import mongoose from "mongoose";

let isConnected= false; // track the connection status

export const connectMongoDB = async () => {
    // create a connection to the DB

    // set mongoose options
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB is already connected");
        // stop it running
        return;
    }
    
    try {
        // try establish the connection

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'google_auth_nextjs',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("connected to MONGODB");
    } catch (error) {
        console.log("Error connection to database: ", error);
    }
}