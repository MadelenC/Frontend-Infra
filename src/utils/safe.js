export const safe = (v) => {

  if (
    v === null ||
    v === undefined ||
    v === ""
  ) {
    return "-";
  }

  return String(v);

};