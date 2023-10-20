import { Request, Response } from "express";
import { profissionalSchema } from "./validationprofissional";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const profissinalController = {
    criar: async (req: Request, res: Response) => {
        const {nome,nascimento,cpf,crp} = req.body
        try {
          if( nome.length <= 255 && !(await prisma.profissional.findUnique(cpf)) !(await prisma.profissional.findUnique(crp))){
            await profissionalSchema.validate({nome,nascimento,cpf,crp});
            return res.json(await prisma.profissinal.create({
              data :{nome,nascimento,cpf,crp},
            }));
          }
          else{
            if(nome.length >= 255){
              return res.json("Nome muito grande");
            }
            else if(await prisma.profissional.findUnique(crp)){
              return res.json("CRP já cadastrado")
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
      logar: async (req: Request, res: Response) => {},
      listarPacientes: async (req: Request, res: Response) => {},
      avaliacao: async (req: Request, res: Response) => {},
      relatorio: async (req: Request, res: Response) => {},
}
export default profissinalController;