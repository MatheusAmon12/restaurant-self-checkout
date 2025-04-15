import { z } from "zod";

import { isValidCPF } from "../helpers/is-valid-cpf";

export const finishOrderFormSchema = z.object({
  name: z.string().trim().nonempty({message: "O nome é obrigatório"}),
  cpf: z
    .string()
    .trim()
    .nonempty({ message: "O CPF é obrigatório" })
    .refine((value) => isValidCPF(value), { message: "CPF inválido" }),
});

export type FinishOrderFormSchema = z.infer<typeof finishOrderFormSchema>;