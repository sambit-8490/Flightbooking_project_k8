const Airport = require("../models/Airports");

const createAirport = async (req, res) => {
  try {
    const { code, name, city, country } = req.body;
    const airport = await Airport.create({ code, name, city, country });
    res.json({ message: "Airport created successfully", airport });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, city, country } = req.body;

    const airport = await Airport.findById(id);
    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }

    if (code) airport.code = code;
    if (name) airport.name = name;
    if (city) airport.city = city;
    if (country) airport.country = country;

    await airport.save();
    res.json({ message: "Airport updated successfully", airport });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const airport = await Airport.findByIdAndDelete(id);
    if (!airport) {
      return res.status(404).json({ message: "Airport not found" });
    }
    res.json({ message: "Airport deleted successfully", airport });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.find().sort({ city: 1 });
    res.json({ airports });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const seedAirports = async (req, res) => {
  try {
    const count = await Airport.countDocuments();
    if (count > 0) return res.json({ message: "Airports already seeded" });
    const data = [
      { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India' },
      { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
      { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
      { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', country: 'India' },
      { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
    ];
    await Airport.insertMany(data);
    res.json({ message: 'Seeded airports', count: data.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createAirport, updateAirport, deleteAirport, getAllAirports, seedAirports };
