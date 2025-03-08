
import ticketModel from "../models/bookTicketModel.js";
const movieAggregate = async (req,res) =>{
    try {
        const stat =  await ticketModel.aggregate([
            {
                $group:{

                }
            }
        ])
    } catch (error) {
        res.status(404).json({success:false})
        
    }
}
export {movieAggregate}