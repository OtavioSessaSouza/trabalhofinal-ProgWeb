import * as yup from "yup";
export const pacienteSchema = yup.object().shape({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(255, "O nome deve ter no maximo 255 caracteres"),
  nascimento: yup.string().required("A data é obrigatória"),
  cpf: yup.string().required("O CPF é obrigatório"),
  contato:yup
    .string()
    .required("O telefone é obrigatório")
    .min(10, "O telefone deve conter o dd e o numero como 6788889999 ou 67988887777"),
  contatoEmergencia:yup
    .string()
    .min(10, "O telefone deve conter o dd e o numero como 6788889999 ou 67988887777"),
  respCasoMenor:yup.string().optional(),
});

