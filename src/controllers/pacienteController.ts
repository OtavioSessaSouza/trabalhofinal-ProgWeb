import { Request, Response } from "express";
import { pacienteSchema } from "./validationPacientes";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const pacienteController = {
    criar: async (req: Request, res: Response) => {
        const {nome,nascimento,cpf,contato,contatoEmergencia,respCasoMenor} = req.body
        try {
          if( nome.length <= 255 && !(await prisma.paciente.findUnique(cpf))){
            await pacienteSchema.validate({nome,nascimento,cpf,contato,contatoEmergencia,respCasoMenor});
            return res.json(await prisma.paciente.create({
              data :{nome,nascimento,cpf,contato,contatoEmergencia,respCasoMenor},
            }));
          }
          else{
            if(nome.length >= 255){
              return res.json("Nome muito grande");
            }
            else{
              return res.json("CPF já cadastrado")
            }
          }
    
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },
      logar : async (req: Request, res: Response) => {},
      avaliacao : async (req: Request, res: Response) => {},
      relatorio : async (req: Request, res: Response) => {},


}
export default pacienteController;