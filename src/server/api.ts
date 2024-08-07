import express from "express";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const api = express();
api.use(express.json());

api.get("/", async (req, res) => {
  let users: User[] = [];

  const name = typeof req.query.name === "string" ? req.query.name : undefined;
  const email =
    typeof req.query.email === "string" ? req.query.email : undefined;
  const address =
    typeof req.query.address === "string" ? req.query.address : undefined;
  const phone =
    typeof req.query.phone === "string" ? req.query.phone : undefined;

  users = await prisma.user.findMany({
    where: {
      ...(name && { name }),
      ...(email && { email }),
      ...(address && { address: { contains: address, mode: 'insensitive' } }),
      ...(phone && { phone : { contains: phone, mode: 'insensitive' }}),
    },
  });

  res.status(200).json(users);
});

api.post("/", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    },
  });
  res.status(201).json(req.body);
});

api.put("/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    },
  });
  res.status(201).json(req.body);
});

api.delete("/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "User deleteted" });
});

export { api };
