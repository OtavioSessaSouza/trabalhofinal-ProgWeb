import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const qaController = {
  cadastraQA: async (pergunta: string, avaliacaoId: string) => {
    try {
      const qa = await prisma.QA.create({
        data: { pergunta, avaliacaoId },
      });
      return qa;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  achaQAS: async (req: Request, res: Response) => {
    const { avaliacaoId } = req.body;
    try {
      const qas = await prisma.QA.findMany({
        where: { avaliacaoId: avaliacaoId },
      });

      const response = qas;
      return res.json(response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },

  respondeQAS: async (req: Request, res: Response) => {
    const { avaliacaoId, respostas } = req.body;

    try {
      const qas = await prisma.QA.findMany({
        where: { avaliacaoId: avaliacaoId },
      });

      const newQAS = [];
      for (let i = 0; i < qas.length; i++) {
        newQAS.push(await qaController.insereRespost(qas[i].id, respostas[i]));
      }
      return newQAS;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  insereRespost: async (avaliacaoId: object, resposta: string) => {
    try {
      const qa = await prisma.QA.findUnique({
        where: {
          id: avaliacaoId,
        },
      });
      qa.resposta = resposta;
      const newqa = await prisma.QA.update({
        where: {
          id: avaliacaoId,
        },
        data: {
          pergunta: qa.pergunta,
          resposta: qa.resposta,
          avaliacaoId: qa.avaliacaoId,
        },
      });
      return newqa;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  AllqaAntes: async(profissionalID : string,pacienteID : string) =>{
    try {
      const avsDepois = await prisma.Avaliacao.findMany({
        where: {
          profissionalID: profissionalID,
          pacienteID: pacienteID,
          status : false,
        },
      });

      const idsAvs: any[] = [];
      for(let i = 0;i< avsDepois.length;i++){
        if(!idsAvs.includes(avsDepois[i].id)){
          idsAvs.push(avsDepois[i].id)
        }
      }


      const qasA : any[] = [];
      for(let i = 0;i< idsAvs.length;i++){
        const tqaA = await prisma.QA.findMany({
          where : {
            avaliacaoId : idsAvs[i]
          }
        });
        let temp = []
        for(let i = 0;i < tqaA.length;i++){
          if(tqaA[i].resposta != null){
            temp.push(tqaA[i].resposta)
          }
        }
        qasA.push(temp);
      }

      return qasA

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  AllqaDepois: async(profissionalID : string,pacienteID : string) =>{
    try {
      const avsDepois = await prisma.Avaliacao.findMany({
        where: {
          profissionalID: profissionalID,
          pacienteID: pacienteID,
          status : true,
        },
      });

      const idsAvs: any[] = [];
      for(let i = 0;i< avsDepois.length;i++){
        if(!idsAvs.includes(avsDepois[i].id)){
          idsAvs.push(avsDepois[i].id)
        }
      }


      const qasA : any[] = [];
      for(let i = 0;i< idsAvs.length;i++){
        const tqaA = await prisma.QA.findMany({
          where : {
            avaliacaoId : idsAvs[i]
          }
        });
        let temp = []
        for(let i = 0;i < tqaA.length;i++){
          if(tqaA[i].resposta != null){
            temp.push(tqaA[i].resposta)
          }
        }
        qasA.push(temp);
      }

      return qasA

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};

export default qaController;
