const express = require("express");
const router = express.Router();

let prestadores = [];
let id = 1;

// Listar
router.get("/", (req, res) => {
  res.render("prestadores/list", { prestadores });
});

// Formulário novo
router.get("/novo", (req, res) => {
  res.render("prestadores/form", { prestador: {} });
});

// Criar/Editar
router.post("/salvar", (req, res) => {
  const { nome, tipo_servico, email, telefone, endereco } = req.body;
  if (req.body.id) {
    const index = prestadores.findIndex(p => p.id == req.body.id);
    prestadores[index] = { id: Number(req.body.id), nome, tipo_servico, email, telefone, endereco };
  } else {
    prestadores.push({ id: id++, nome, tipo_servico, email, telefone, endereco });
  }
  res.redirect("/prestadores");
});

// Editar
router.get("/editar/:id", (req, res) => {
  const prestador = prestadores.find(p => p.id == req.params.id);
  res.render("prestadores/form", { prestador });
});

// Excluir
router.get("/excluir/:id", (req, res) => {
  prestadores = prestadores.filter(p => p.id != req.params.id);
  res.redirect("/prestadores");
});

module.exports = router;



/*const express = require("express");
const router = express.Router();

let prestadores = [];
let id = 1;

// Criar Prestador
router.post("/", (req, res) => {
  const novoPrestador = { id: id++, ...req.body };
  prestadores.push(novoPrestador);
  res.status(201).json(novoPrestador);
});

// Listar Prestadores
router.get("/", (req, res) => {
  res.json(prestadores);
});

// Atualizar Prestador
router.put("/:id", (req, res) => {
  const index = prestadores.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).send("Prestador não encontrado");
  prestadores[index] = { id: Number(req.params.id), ...req.body };
  res.json(prestadores[index]);
});

// Excluir Prestador
router.delete("/:id", (req, res) => {
  prestadores = prestadores.filter(p => p.id != req.params.id);
  res.send("Prestador removido com sucesso");
});

module.exports = router;*/

