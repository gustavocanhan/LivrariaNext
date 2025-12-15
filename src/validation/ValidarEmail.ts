import { emailSchema } from "./emailSchema";

export default function ValidarEmail(email: string) {
  const resultado = emailSchema.safeParse(email);

  if (resultado.success) {
    return true;
  }

  return false;
}
