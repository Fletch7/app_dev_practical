import express from "express";
import {
  getGigs,
  getGig,
  createGig,
  updateGig,
  deleteGig,
} from "../controllers/gig.js";
import jwtAuth from "../middleware/jwtAuth.js";
import rbac from "../middleware/rbac.js";

const router = express.Router();

router.get("/", getGigs);
router.get("/:id", getGig);
router.post("/", jwtAuth, rbac(["ORGANISER", "ADMIN"]), createGig);
router.put("/:id", jwtAuth, rbac(["ADMIN"]), updateGig);
router.delete("/:id", jwtAuth, rbac(["ORGANISER", "ADMIN"]), deleteGig);

export default router;