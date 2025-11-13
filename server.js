
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
const tutorRoutes = require("/rotas/tutor");
const prestadorRoutes = require("/rotas/prestador");
const agendamentoRoutes = require("/rotas/agendamento");

app.use("/tutores", tutorRoutes);
app.use("/prestadores", prestadorRoutes);
app.use("/agendamentos", agendamentoRoutes);

// Página inicial
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => console.log(`✅ Servidor rodando em http://localhost:${port}`));






