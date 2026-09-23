import venueRepository from "../repositories/venue.js";
import errorHandler from "../utils/errorHandler.js";

const getVenues = async (req, res) => {
  try {
    const venues = await venueRepository.findAll();
    return res.status(200).json({ data: venues });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const getVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await venueRepository.findById(id);
    if (!venue) {
      return res.status(200).json({ message: `No venue with id: ${id} found` });
    }
    return res.status(200).json({ data: venue });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const createVenue = async (req, res) => {
  try {
    const { name, suburb, city, capacity } = req.body;
    const venue = await venueRepository.create({
      name,
      suburb,
      city,
      capacity,
    });
    return res.status(201).json({
      message: "Venue successfully created",
      data: venue,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await venueRepository.findById(id);
    if (!venue) {
      return res.status(404).json({ message: `No venue with id: ${id} found` });
    }
    const { name, suburb, city, capacity } = req.body;
    const updated = await venueRepository.update(id, {
      name,
      suburb,
      city,
      capacity,
    });
    return res.status(200).json({
      message: `Venue with id: ${id} successfully updated`,
      data: updated,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await venueRepository.findById(id);
    if (!venue) {
      return res.status(404).json({ message: `No venue with id: ${id} found` });
    }
    await venueRepository.delete(id);
    return res.status(200).json({
      message: `Venue with id: ${id} successfully deleted`,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};

export { getVenues, getVenue, createVenue, updateVenue, deleteVenue };