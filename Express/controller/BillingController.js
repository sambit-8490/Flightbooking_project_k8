const Billing = require("../models/Billing");   

const processPayment = async (req, res) => {
    try {
        const { bookingId, amount, paymentMethod } = req.body;
        const userId = req.userData?.id;
        
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        
        if (!bookingId || !amount || !paymentMethod) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        // Simulate payment processing
        const transactionId = `TXN${Date.now()}${Math.random().toString(36).substring(7)}`;
        
        const billing = await Billing.create({
            user: userId,
            booking: bookingId,
            amount,
            paymentMethod,
            status: "PAID",
            transactionId
        });
        res.json({ message: "Payment processed successfully", billing });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getUserBillings = async (req, res) => {
    try{
        const userId = req.userData?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const billings = await Billing.find({ user: userId })
            .populate("booking")
            .sort({ createdAt: -1 });
        res.json({ billings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { processPayment, getUserBillings };