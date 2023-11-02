const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const qaController = {
  cadastraQA: async (
    pergunta: string,
    avaliacaoId: string
  ) => {
    try {
      const qa = await prisma.QA.create({
        data: { pergunta, avaliacaoId},
      });
      return qa
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
export default qaController;