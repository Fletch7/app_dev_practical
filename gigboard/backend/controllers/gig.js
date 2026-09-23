import gigRepository from "../repositories/gig.js";
import errorHandler from "../utils/errorHandler.js";

const getGigs = async (req, res) => {
  try {
    const gigs = await gigRepository.findAll();
    return res.status(200).json({ data: gigs });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const getGig = async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await gigRepository.findById(id);
    return res.status(200).json({ data: gig });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const createGig = async (req, res) => {
  try {
    const { title, artist, date, ticketPrice, venueId } = req.body;
    const gig = await gigRepository.create({
      title,
      artist,
      date,
      ticketPrice,
      venueId,
    });
    return res.status(201).json({
      message: "Gig successfully created",
      data: gig,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const updateGig = async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await gigRepository.findById(id);
    if (!gig) {
      return res.status(404).json({ message: `No gig with id: ${id} found` });
    }
    const { title, artist, date, ticketPrice, venueId } = req.body;
    const updated = await gigRepository.update(id, {
      title,
      artist,
      date,
      ticketPrice,
      venueId,
    });
    return res.status(200).json({
      message: `Gig with id: ${id} successfully updated`,
      data: updated,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};

const deleteGig = async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await gigRepository.findById(id);
    if (!gig) {
      return res.status(404).json({ message: `No gig with id: ${id} found` });
    }
    await gigRepository.delete(id);
    return res.status(200).json({
      message: `Gig with id: ${id} successfully deleted`,
    });
  } catch (err) {
    return errorHandler(res, err);
  }
};

export { getGigs, getGig, createGig, updateGig, deleteGig };