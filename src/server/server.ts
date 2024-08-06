import express from "express";

const api = express();

api.get('/', (_, res) => {
  return res.send("Olá DEV!");
});

export { api };
