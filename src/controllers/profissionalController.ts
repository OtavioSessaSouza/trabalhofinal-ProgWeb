import { Request, Response, response } from "express";
import { profissionalSchema } from "./validationProfissional";
import avaliacaoController from "./avaliacaoController";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const profissinalController = {
  criar: async (req: Request, res: Response) => {
    const { nome, nascimento, cpf, crp } = req.body;
    try {
      await profissionalSchema.validate({ nome, nascimento, cpf, crp });
      const response = await prisma.Profissional.create({
        data: { nome, nascimento, cpf, crp },
      });
      return response
        ? res.status(200).json(response)
        : res.status(400).json({ message: "deu ruim" });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  criarAvaliacao: async (req: Request, res: Response) => {
    try {
      const response = await avaliacaoController.cadastraAV(req, res);
      return response
        ? res.status(200).json(response)
        : res.status(400).json({ message: "deu ruim" });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  //esta errado
  listarPacientes: async (req: Request, res: Response) => {
    const { profissionalID, pacienteID } = req.body;
    try {
      const response = await prisma.paciente.findMany({
        where: {
          profissionalID: profissionalID,
          pacienteID: pacienteID,
        },
      });
      return response
        ? res.status(200).json(response)
        : res.status(400).json({ message: "deu ruim" });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  avaliacao: async (req: Request, res: Response) => {},
  relatorio: async (req: Request, res: Response) => {},

  //teste
  listarTodos: async (req: Request, res: Response) => {
    try {
      const response = await prisma.Profissional.findMany();
      return response
        ? res.status(200).json(response)
        : res.status(400).json({ message: "deu ruim" });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
export default profissinalController;
