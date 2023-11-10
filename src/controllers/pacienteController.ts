import { Request, Response } from "express";
import { pacienteSchema } from "./validationPacientes";
import qaController from "./qaController";
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
  respAvaliacao: async (req: Request, res: Response) => {
    try {
      const qas = await qaController.respondeQAS(req, res);
      const response = qas;

      return response
        ? res.status(200).json(response)
        : res.status(400).json({ message: "deu ruim" });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  verRelatorio: async (req: Request, res: Response) => {
    //Calcule a média das respostas para cada conjunto de respostas "antes" e "depois" da consulta.
    //Subtraia a média "antes" da média "depois" para determinar a mudança no estado do paciente em cada consulta.
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

      const response = { mediaAntes: mediaAntes, mediaDepois: mediaDepois };//devolvendo vetores de medias 
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
