import express, { Request, Response } from 'express';
import pacienteController from "./controllers/pacienteController"
import profissionalController from "./controllers/profissionalController"
const app = express();
app.use(express.json())
const PORT = 3000;


app.get('/', (req : Request, res : Response) => {
  res.send('Olá, Mundo!');
});
//rotas
//home

//Pacientes

//cadastrar paciente
app.post("/paciente",pacienteController.criar);
//logar paciente
app.get("/paciente",pacienteController.logar);
//avaliação do paciente
app.post("/paciente",pacienteController.avaliacao);
//relatorio geral de um paciente
app.get("/paciente",pacienteController.relatorio);


//Profissional
//cadastrar profissional
app.post("/profissional",profissionalController.criar);
//logar profissinal
app.get("/profissional",profissionalController.logar);
//listar pacientes
app.get("/profissional",profissionalController.listarPacientes);
//visializar a avaliação do paciente
app.get("/profissional",profissionalController.avaliacao);
//relatorio geral
app.get("/profissional",profissionalController.relatorio);




app.listen(PORT, () => {
  console.log(`Servidor rodando na porta em http://localhost:${PORT}/ `);
});