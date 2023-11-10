import { Request, Response } from "express";
import { profissionalSchema } from "./validationProfissional";
import avaliacaoController from "./avaliacaoController";
import qaController from "./qaController";
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

  listarPacientes: async (req: Request, res: Response) => {
    const { profissionalID } = req.body;
    try {
      const avs = await prisma.Avaliacao.findMany({
        where: {
          profissionalID: profissionalID,
        },
      });
      const idsPacientes: any[] = [];
      for (let i = 0; i < avs.length; i++) {
        if (!idsPacientes.includes(avs[i].pacienteID)) {
          idsPacientes.push(avs[i].pacienteID);
        }
      }

      const response = await prisma.Paciente.findMany({
        where: {
          id: {
            in: idsPacientes,
          },
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
  relatorio: async (req: Request, res: Response) => {
    const { profissionalID, pacienteID } = req.body;
    try {
      const qasA = await qaController.AllqaAntes(profissionalID, pacienteID);
      const qasD = await qaController.AllqaDepois(profissionalID, pacienteID);
      const mediaAntes: number[] = [];
      qasA?.map((qas) => mediaAntes.push(parseFloat(calculateAverage(qas))));

      const mediaDepois: number[] = [];
      qasD?.map((qas) => mediaDepois.push(parseFloat(calculateAverage(qas))));

      function calculateAverage(array: any[]) {
        var total = 0;
        var count = 0;

        array.forEach(function (item, index) {
          total += parseInt(item);
          count++;
        });
        let temp = total / count;
        return temp.toFixed(2);
      }

      const response = { mediaAntes: mediaAntes, mediaDepois: mediaDepois }; //devolvendo vetores de medias
      return response
        ? res.status(200).json(response)
        : res.status(400).json({ message: "deu ruim" });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

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
