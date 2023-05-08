const express = require("express");
const routes = express.Router();
const Usuario = require("./models/Usuario");

routes.get("/", async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.status(200).json(usuarios);
});

routes.get("/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  res.status(200).json(usuario);
});

routes.post("/", async (req, res) => {
  const { nome, idade } = req.body;
  try {
    const usuario = await Usuario.create({ nome, idade });
    res.status(201).json({
      message: "Usuário adicionado com sucesso!",
      usuario: { id: usuario.id, nome: usuario.nome, idade: usuario.idade },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

routes.put("/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  const { nome, idade } = req.body;
  try {
    await usuario.update({ nome, idade });
    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      usuario: { id: usuario.id, nome: usuario.nome, idade: usuario.idade },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

routes.delete("/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (!usuario) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  try {
    await usuario.destroy();
    res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = routes;