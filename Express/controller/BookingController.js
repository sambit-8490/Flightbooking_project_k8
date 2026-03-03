const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

const createBooking = async (req, res) => {
  try {
    const { flightId, seatCount } = req.body;
    const seats = Number(seatCount);

    if (!flightId || !seats || seats < 1) {
      return res.status(400).json({ message: "Invalid flight or seat count" });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    if (flight.availableSeats < seats) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    const totalAmount = flight.price * seats;
    const booking = await Booking.create({
      user: req.userData.id,
      flight: flightId,
      seatCount: seats,
      totalAmount,
      status: "CONFIRMED",
    });

    flight.availableSeats -= seats;
    await flight.save();

    res.json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userData.id }).populate("flight");
    res.json({ bookings });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOneAndDelete({ _id: id, user: req.userData.id });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Flight.findByIdAndUpdate(booking.flight, {
      $inc: { availableSeats: booking.seatCount },
    });

    res.json({ message: "Booking cancelled and removed", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("flight").populate("user", "email name").sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking, getUserBookings, getAllBookings, cancelBooking };
