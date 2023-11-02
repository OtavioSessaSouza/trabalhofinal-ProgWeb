import * as yup from "yup";
export const avaliacaoSchema = yup.object().shape({
  profissionalID: yup
    .string()
    .required("O profissionalID é obrigatório"),
  pacienteID: yup
    .string()
    .required("O profissionalID é obrigatório"),
  status:yup
    .boolean()
    .required("O status é obrigatório"),
  condicao: yup
    .string()
    .required("A condição é obrigatória"),
});