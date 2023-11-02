import { Request, Response } from "express";
import { pacienteSchema } from "./validationPacientes";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const pacienteController = {
  registar: async (req: Request, res: Response) => {
    const { nome, nascimento, cpf, contato, contatoEmergencia, respCasoMenor } =
      req.body;
    try {
      await pacienteSchema.validate({
        nome,
        nascimento,
        cpf,
        contato,
        contatoEmergencia,
        respCasoMenor,
      });
      const response = await prisma.paciente.create({
        data: {
          nome,
          nascimento,
          cpf,
          contato,
          contatoEmergencia,
          respCasoMenor,
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
  listarPacientesdePro: async (req: Request, res: Response) => {
    const { profissionalID } = req.body;
    try {
      const response = await prisma.paciente.findMany({
        where: {
          profissionalID: profissionalID,
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
  respAvaliacao: async (req: Request, res: Response) => {},
  verRelatorio: async (req: Request, res: Response) => {},

  //teste
  listarTodos: async (req: Request, res: Response) => {
    try {
      const response = await prisma.paciente.findMany();
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
export default pacienteController;
