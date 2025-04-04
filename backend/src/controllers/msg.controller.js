import User from "../models/user.model.js";
import express from 'express'
import Message from "../models/message.model.js";
import cloudinary from 'cloudinary'; 
import { getReciverSocketId,io } from "../lib/socket.js";

 async function GetUserOnSideBar(req, res){
     try {
         const CurrentUser = req.user._id;  
         const filterUser = await User.find({ _id: { $ne: CurrentUser } }).select("-password");
         res.status(200).json(filterUser); // sending 
     }
     catch (error) {
         console.log( "Error in Getting User On Side Bar"+error.message);
         res.status(400).json({Error:"Internal Server Error"})
     }
}

async function GetMsg(req,res) {
    try {
        const { id: userToChat } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChat },
                { senderId: userToChat, receiverId: myId }
            ],
        });
        res.status(200).json(messages);
    }
    catch (error) {
        console.log( "Error in Getting User "+error.message);
        res.status(400).json({Error:"Internal Server Error"})
    }
}
async function SendMsg(req,res) {
   try {
       const { id: userId } = req.params; // it get id and named it as userId
       const myId = req.user._id;
       const { image, text } = req.body;
       let imageUrl;
       if (image) {
           const uploadResponse = await cloudinary.uploader.upload(image);
           imageUrl = uploadResponse.secure_url;
       }
       const newMessage = new Message({
         senderId:  myId,
         receiverId:  userId,
           text,
           image:imageUrl,
       });
       await newMessage.save();

       const reciverSocketId = getReciverSocketId(userId);
       if (reciverSocketId) {
           // as io.emit() broadcast to everyone so make it only for user i use to() 
           io.to(reciverSocketId).emit("newMessage", newMessage);
       }
       res.status(200).json(newMessage);

   } catch (error) {
console.log("Error is "+error.message );
       res.status(400).json("Internal Server Error");
   } 
}
export  {GetUserOnSideBar,GetMsg,SendMsg};