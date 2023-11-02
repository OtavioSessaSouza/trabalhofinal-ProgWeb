import { avaliacaoSchema } from "./validationAvaliacao";
import qaController from "./qaController";
import { Request, Response, response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const avaliacaoController = {
  cadastraAV: async (req: Request, res: Response) => {
    const date = new Date();
    const { profissionalID, pacienteID, status, perguntas, condicao } = req.body;
    try {
      await avaliacaoSchema.validate({
        profissionalID,
        pacienteID,
        date,
        status,
        condicao,
      });
      const av = await prisma.avaliacao.create({
        data: { profissionalID, pacienteID, data: date, status, condicao },
      });
      
      if (av) {
        const qa = [];
        for (let i in perguntas) {
          qa.push(
            await qaController.cadastraQA(perguntas[i].pergunta, av.id)
          );
        }

        const updatedAv = await prisma.avaliacao.update({
          where: {
            profissionalID,
            pacienteID,
            data: date,
          },
          data: {
            perguntas: av.qa,
          },
        });
        const response = updatedAv;
        return response;
      } else {
        res.status(400).json({ message: "deu ruim" });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  listaTodasAVP: async (req: Request, res: Response) => {
    const { profissionalID, pacienteID } = req.body;
    try {
      const response = await prisma.avaliacao.findMany({
        where: {
          profissionalID: profissionalID,
          pacienteID: pacienteID,
        },
      });
      return res.json(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};

export default avaliacaoController;
