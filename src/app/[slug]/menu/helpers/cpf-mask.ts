export const cpfMask = (value: string) => {
  value = value.replace(/\D/g, "");

  value = value.substring(0, 11);

  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  return value;
};
