import prisma from "../prisma/db.js";

class GigRepository {
  async findAll() {
    return await prisma.gig.findMany({
      orderBy: { date: "asc" },
      include: { venue: { select: { id: true, name: true } } },
    });
  }

  async findById(id) {
    return await prisma.gig.findUnique({
      where: { id },
      include: { venue: { select: { id: true, name: true } } },
    });
  }

  async create(data) {
    return await prisma.gig.create({
      data: {
        title: data.title,
        artist: data.artist,
        date: new Date(data.date),
        ticketPrice: data.ticketPrice,
        venue: { connect: { id: data.venueId } },
      },
    });
  }

  async update(id, data) {
    return await prisma.gig.update({
      where: { id },
      data: {
        title: data.title,
        artist: data.artist,
        date: data.date ? new Date(data.date) : undefined,
        ticketPrice: data.ticketPrice,
        ...(data.venueId && { venue: { connect: { id: data.venueId } } }),
      },
    });
  }

  async delete(id) {
    return await prisma.gig.delete({ where: { id } });
  }
}

export default new GigRepository();