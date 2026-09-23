import express from "express";
import cors from "cors";
import compression from "compression";
import authRoutes from "./routes/auth.js";
import venueRoutes from "./routes/venue.js";
import gigRoutes from "./routes/gig.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(compression());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/gigs", gigRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;