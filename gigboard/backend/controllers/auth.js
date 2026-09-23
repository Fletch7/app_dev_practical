import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/db.js";

const register = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;

    const allowedRoles = ["ORGANISER", "ATTENDEE"];
    const assignedRole = req.body.role || "ATTENDEE";
    if (!allowedRoles.includes(assignedRole)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const existing = await prisma.user.findUnique({ where: { emailAddress } });
    if (existing) {
      return res
        .status(409)
        .json({ message: "An account with that email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: { firstName, lastName, emailAddress, password: hashedPassword, role: assignedRole },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        emailAddress: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "Account successfully created",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await prisma.user.findUnique({ where: { emailAddress } });
    if (!user) {
      return res.status(401).json({ message: "Email address not found" });
    }

    const passwordMatches = await bcryptjs.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { register, login };