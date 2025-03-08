import { string } from "joi";
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
movieName:{type:String, required:true},
movieDate:{type:String, required:true},
movieTime:{type:String, required:true},
moviePrice :{type:String, required:true},
seatNo:{type:String, required:true},

email:{type:String, required:true},
phone:{type:String, required:true},
name:{type:String, required:true},

})
const ticketModel = mongoose.model("tickets", ticketSchema)
export default ticketModel