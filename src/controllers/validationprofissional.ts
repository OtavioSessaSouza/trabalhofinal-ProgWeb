import * as yup from "yup";
export const profissionalSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  nascimento: yup.string().required("A data é obrigatória"),
  cpf: yup.string().required("O CPF é obrigatório"),
  crp: yup.string().required("O CRP é obrigatório"),
});