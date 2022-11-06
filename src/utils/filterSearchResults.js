const normalize = (string) =>
  string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const filterByQuery = (items, query) =>
  // normalize(item.toLowerCase()).includes(query.toLowerCase());
  items.some((item) =>
    normalize(item.toLowerCase()).includes(query.toLowerCase())
  );

export const filterByDuration = (duration) => duration <= 40;
