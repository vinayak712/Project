import mongoose from 'mongoose'
export const ConnectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MongoDb_Url)
        console.log("MongoDB connected :" + (con.connection.host));
    }
    catch (error) {
        console.error("MongDb connection error:" + error);
    }
};