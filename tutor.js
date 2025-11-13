const express = require("express");
const router = express.Router();

let tutores = [];
let id = 1;

// Listar
router.get("/", (req, res) => {
  res.render("tutores/list", { tutores });
});

// Formulário de novo tutor
router.get("/novo", (req, res) => {
  res.render("tutores/form", { tutor: {} });
});

// Criar
router.post("/salvar", (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  if (req.body.id) {
    // Editar
    const index = tutores.findIndex(t => t.id == req.body.id);
    tutores[index] = { id: Number(req.body.id), nome, email, telefone, endereco };
  } else {
    tutores.push({ id: id++, nome, email, telefone, endereco });
  }
  res.redirect("/tutores");
});

// Editar
router.get("/editar/:id", (req, res) => {
  const tutor = tutores.find(t => t.id == req.params.id);
  res.render("tutores/form", { tutor });
});

// Excluir
router.get("/excluir/:id", (req, res) => {
  tutores = tutores.filter(t => t.id != req.params.id);
  res.redirect("/tutores");
});

module.exports = router;
