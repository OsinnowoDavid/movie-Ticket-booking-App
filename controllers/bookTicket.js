import { ticketValid } from "../utils/validator.js";
import ticketModel from "../models/bookTicketModel.js";

const registerMovieTicket = async (req, res) => {
    try {
        const { error, value } = ticketValid(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
        const ticketDetails = new ticketModel(value);
        await ticketDetails.save();
        res.status(200).json({ success: true, message: "Ticket registered successfully" });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const editMoviesTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTicket = await ticketModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, message: "Ticket updated successfully", data: updatedTicket });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const deleteMovieTicket = async (req, res) => {
    try {
        const { id } = req.params;
        await ticketModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const getMovieTicket = async (req, res) => {
    try {
        const allTickets = await ticketModel.find();
        res.status(200).json({ success: true, data: allTickets });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

const getMovieTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const singleTicket = await ticketModel.findById(id);
        res.status(200).json({ success: true, data: singleTicket });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
    }
}

export { registerMovieTicket, editMoviesTicket, deleteMovieTicket, getMovieTicket, getMovieTicketById }