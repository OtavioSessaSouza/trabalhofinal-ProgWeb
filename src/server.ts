import express, { Request, Response } from "express";
import pacienteController from "./controllers/pacienteController";
import profissionalController from "./controllers/profissionalController";
import avaliacaoController from "./controllers/avaliacaoController";
import qaController from "./controllers/qaController";
const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Olá, Mundo!");
});
//rotas
//home

//Pacientes

//cadastrar paciente
app.post("/paciente", pacienteController.registar);
//funciona

//avaliação do paciente //paciente responde avaliação
app.post("/paciente/respAv", pacienteController.respAvaliacao);
//funciona

//lista perguntas de uma avaliacao
app.get("/qa/id", qaController.achaQAS);
//funciona
//mexer





//relatorio geral de um paciente //paciente ve relatorio de avaliação
app.get("/paciente/relatorio", pacienteController.verRelatorio);















//Profissional
//cadastrar profissional
app.post("/profissional", profissionalController.criar);
//funciona

//criar uma avaliação com as 3 perguntas para um paciente
app.post("/profissional/cAV", profissionalController.criarAvaliacao);
//funciona

//lista todas as avaliacoes de um profissional com um paciente
app.get("/profissional/lAV", avaliacaoController.listaTodasAVP);
//funciona

//listar pacientes de um profissional
app.get("/profissional/ltP", profissionalController.listarPacientes);
//funciona

//relatorio geral de um paciente
app.get("/profissional/relatorio", profissionalController.relatorio);













//em teste


//listar todos os pacientes
app.get("/paciente/lt", pacienteController.listarTodos);
//funciona

//listar todos os profissionais
app.get("/profissional/lt", profissionalController.listarTodos);
//funciona

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta em http://localhost:${PORT}/ `);
});
