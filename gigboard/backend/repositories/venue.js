import prisma from "../prisma/db.js";

class VenueRepository {
  async findAll() {
    return await prisma.venue.findMany({
      orderBy: { name: "asc" },
    });
  }

  async findById(id) {
    return await prisma.venue.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.venue.create({ data });
  }

  async update(id, data) {
    return await prisma.venue.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.venue.delete({ where: { id } });
  }
}

export default new VenueRepository();