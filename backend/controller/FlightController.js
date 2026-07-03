const Flight = require("../models/Flight");
const Airport = require("../models/Airports");

const seedFlights = async (req, res) => {
    try {
        await Flight.deleteMany({});

        const airports = await Airport.find().limit(10);
        
        if (airports.length < 2) {
            return res.status(400).json({ message: "Not enough airports in database. Create airports first." });
        }

        const airlines = [
            "Air India",
            "IndiGo",
            "SpiceJet",
            "Vistara",
            "Akasa Air",
            "Go First",
        ];

        const sampleFlights = Array.from({ length: 20 }, (_, i) => {
            const fromIndex = i % airports.length;
            const toIndex = (i + 1) % airports.length;
            const from = airports[fromIndex]._id;
            const to = airports[toIndex]._id;
            const airline = airlines[i % airlines.length];
            const departureOffsetHours = (i + 1) * 6;
            const durationHours = 1 + (i % 4);
            const departureTime = new Date(Date.now() + departureOffsetHours * 60 * 60 * 1000);
            const arrivalTime = new Date(departureTime.getTime() + durationHours * 60 * 60 * 1000);
            const totalSeats = 140 + (i % 5) * 20;
            const price = 3200 + (i % 7) * 350;

            return {
                airline,
                flightNumber: `FL${1000 + i}`,
                from,
                to,
                departureTime,
                arrivalTime,
                price,
                totalSeats,
                availableSeats: totalSeats,
            };
        });

        const flights = await Flight.create(sampleFlights);
        res.json({ message: "Flights seeded successfully", flights });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createFlight = async (req, res) => {
    try {
        const {
            airline,
            flightNumber,
            from,
            to,
            departureTime,
            arrivalTime,
            price,
            totalSeats,
        } = req.body;

        if (!airline || !flightNumber || !from || !to || !departureTime || !arrivalTime || !price || !totalSeats) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const flight = await Flight.create({
            airline,
            flightNumber,
            from,
            to,
            departureTime,
            arrivalTime,
            price,
            totalSeats,
            availableSeats: totalSeats,
        });
        res.json({ message: "Flight created successfully", flight });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const { airline, flightNumber, from, to, departureTime, arrivalTime, price, totalSeats } = req.body;

        const flight = await Flight.findById(id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        // Update fields if provided
        if (airline) flight.airline = airline;
        if (flightNumber) flight.flightNumber = flightNumber;
        if (from) flight.from = from;
        if (to) flight.to = to;
        if (departureTime) flight.departureTime = departureTime;
        if (arrivalTime) flight.arrivalTime = arrivalTime;
        if (price) flight.price = price;
        if (totalSeats) {
            const seatsDiff = totalSeats - flight.totalSeats;
            flight.totalSeats = totalSeats;
            flight.availableSeats += seatsDiff;
        }

        await flight.save();
        res.json({ message: "Flight updated successfully", flight });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteFlight = async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findByIdAndDelete(id);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        res.json({ message: "Flight deleted successfully", flight });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllFlights = async (req, res) => {
    try {
    const { id, from, to, date } = req.query;
    const query = {};
    if (id) query._id = id;
        if (from) query.from = from;
        if (to) query.to = to;
        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            query.departureTime = { $gte: start, $lte: end };
        }

        const flights = await Flight.find(query)
            .populate("from")
            .populate("to")
            .sort({ departureTime: 1 });
        res.json({ flights });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createFlight, updateFlight, deleteFlight, getAllFlights, seedFlights };