export const getEmptyMessageByProductMode = (productMode: string) => {
  let message = "";

  if (productMode === "0") {
    message = "No se encontraron combos en esta página.";
  }

  if (productMode === "1") {
    message = "No se encontraron productos sencillos en esta página.";
  }

  return message;
};
