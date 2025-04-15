export const isValidCPF = (cpf: string): boolean => {
  // Remove todos os caracteres que não são números (pontuação, espaços etc.)
  cpf = cpf.replace(/[^\d]+/g, "");

  // Verifica se o CPF tem exatamente 11 dígitos ou se todos os dígitos são iguais (caso inválido)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  // Aplica a regra para obter o primeiro dígito verificador
  let firstCheckDigit = 11 - (sum % 11);
  if (firstCheckDigit >= 10) firstCheckDigit = 0;

  // Compara o dígito calculado com o dígito informado no CPF (posição 9)
  if (firstCheckDigit !== parseInt(cpf.charAt(9))) return false;

  // Calcula o segundo dígito verificador (agora com 10 números)
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  // Aplica a regra para obter o segundo dígito verificador
  let secondCheckDigit = 11 - (sum % 11);
  if (secondCheckDigit >= 10) secondCheckDigit = 0;

  // Compara o dígito calculado com o segundo dígito informado no CPF (posição 10)
  if (secondCheckDigit !== parseInt(cpf.charAt(10))) return false;

  // Se passou por todas as verificações, o CPF é válido
  return true;
};
