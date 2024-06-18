export const getQueryString = (
  searchParams: string,
  param: { name: string; value: string | null } | null = null
) => {
  const paramsOrder = ["q", "page", "orderby", "mode"];
  const oldParams = new URLSearchParams(searchParams);
  const newParams = new URLSearchParams();

  if (!param) {
    return oldParams;
  }

  // Si el parámetro entrado es "q" y está vacío, eliminarlo
  if (param.name === "q" && (!param.value || param.value.trim() === "")) {
    oldParams.delete("q");
    paramsOrder.splice(0, 1);
  }

  // Inicializar "page" en "1"
  if (oldParams.get("page") && (param.name === "q" || param.name === "mode")) {
    newParams.set("page", "1");
    paramsOrder.splice(
      paramsOrder.findIndex((value) => value === "page"),
      1
    );
  }

  paramsOrder.forEach((paramType) => {
    if (param.name === paramType) {
      if (param.value) {
        newParams.set(paramType, param.value);
      }
    } else if (oldParams.has(paramType)) {
      newParams.set(paramType, oldParams.get(paramType) || "");
    }
  });

  if (newParams.get("page") !== null) {
    if (Number.isNaN(parseInt(newParams.get("page") || "0"))) {
      newParams.delete("page");
    }
  }

  return newParams.toString();
};