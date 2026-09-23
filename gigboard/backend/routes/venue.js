import express from "express";
import {
  getVenues,
  getVenue,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../controllers/venue.js";
import jwtAuth from "../middleware/jwtAuth.js";
import rbac from "../middleware/rbac.js";

const router = express.Router();

router.get("/", getVenues);
router.get("/:id", getVenue);
router.post("/", jwtAuth, rbac(["SOME_RANDOM_PERSON_WHO_SHOULD_NOT_BE_ALLOWED_TO_CREATE_VENUES"]), createVenue);
router.put("/:id", jwtAuth, rbac(["ORGANISER"]), updateVenue);
router.delete("/:id", deleteVenue);

export default router;