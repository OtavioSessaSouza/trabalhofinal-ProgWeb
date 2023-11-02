import express, { Request, Response } from "express";
import pacienteController from "./controllers/pacienteController";
import profissionalController from "./controllers/profissionalController";
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
//avaliação do paciente
app.post("/paciente", pacienteController.respAvaliacao);
//relatorio geral de um paciente
app.get("/paciente", pacienteController.verRelatorio);
//test
app.get("/paciente/lt", pacienteController.listarTodos);

//Profissional
//cadastrar profissional
app.post("/profissional", profissionalController.criar);
//criar uma avaliação com as 3 perguntas para um paciente
app.post("/profissional/av", profissionalController.criarAvaliacao);




//listar pacientes
app.get("/profissional", profissionalController.listarPacientes);
//visializar a avaliação do paciente
app.get("/profissional", profissionalController.avaliacao);
//relatorio geral
app.get("/profissional", profissionalController.relatorio);

//test
app.get("/profissional/lt", profissionalController.listarTodos);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta em http://localhost:${PORT}/ `);
});
