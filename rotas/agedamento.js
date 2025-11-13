const express = require("express");
const router = express.Router();

let agendamentos = [];
let id = 1;

// Listar
router.get("/", (req, res) => {
  res.render("agendamentos/list", { agendamentos });
});

// Formulário
router.get("/novo", (req, res) => {
  res.render("agendamentos/form", { agendamento: {} });
});

// Criar/Editar
router.post("/salvar", (req, res) => {
  const { id_tutor, id_prestador, data, servico, status } = req.body;
  if (req.body.id) {
    const index = agendamentos.findIndex(a => a.id == req.body.id);
    agendamentos[index] = { id: Number(req.body.id), id_tutor, id_prestador, data, servico, status };
  } else {
    agendamentos.push({ id: id++, id_tutor, id_prestador, data, servico, status });
  }
  res.redirect("/agendamentos");
});

// Editar
router.get("/editar/:id", (req, res) => {
  const agendamento = agendamentos.find(a => a.id == req.params.id);
  res.render("agendamentos/form", { agendamento });
});

// Excluir
router.get("/excluir/:id", (req, res) => {
  agendamentos = agendamentos.filter(a => a.id != req.params.id);
  res.redirect("/agendamentos");
});

module.exports = router;




/*const express = require("express");
const router = express.Router();

let agendamentos = [];
let id = 1;

// Criar Agendamento
router.post("/", (req, res) => {
  const novoAgendamento = { id: id++, ...req.body };
  agendamentos.push(novoAgendamento);
  res.status(201).json(novoAgendamento);
});

// Listar Agendamentos
router.get("/", (req, res) => {
  res.json(agendamentos);
});

// Atualizar Agendamento
router.put("/:id", (req, res) => {
  const index = agendamentos.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).send("Agendamento não encontrado");
  agendamentos[index] = { id: Number(req.params.id), ...req.body };
  res.json(agendamentos[index]);
});

// Excluir Agendamento
router.delete("/:id", (req, res) => {
  agendamentos = agendamentos.filter(a => a.id != req.params.id);
  res.send("Agendamento removido com sucesso");
});

module.exports = router;*/
