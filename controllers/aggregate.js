
import ticketModel from "../models/bookTicketModel.js";
const movieAggregate = async (req,res) =>{
    try {
        const stat =  await ticketModel.aggregate([
            {
                $lookup:{

                    from:"movies",
                    localField:"movieName",
                    foreignField:"movieName",
                    as:"movie"
                }
            },
            {
                $addFields:{
                    movie:{
                        $arrayElemAt:["$movie",0]
                    }
                }
            }
        ])
    } catch (error) {
        res.status(404).json({success:false})
        
    }
}
export {movieAggregate}