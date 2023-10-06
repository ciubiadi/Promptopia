// hook up to the database
import mongoose from 'mongoose';

let isConnected = false; // track the connection status

export const connectToDB = async () => {
    // create a connection to the DB
    
    // set mongoose options
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDB is already connected');
        // stop it running
        return;
    }

    // if not already connected
    try {
        // try establish the connection
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}