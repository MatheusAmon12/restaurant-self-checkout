import { z } from "zod";

import { isValidCPF } from "../../menu/helpers/is-valid-cpf";

export const cpfFormSchema = z.object({
  cpf: z
    .string()
    .trim()
    .nonempty({ message: "O CPF é obrigatório" })
    .refine((value) => isValidCPF(value), { message: "CPF inválido" }),
});

export type CpfFormSchema = z.infer<typeof cpfFormSchema>;
