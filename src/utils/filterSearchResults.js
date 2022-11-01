export const filterByQuery = (item, query) =>
  item.toLowerCase().includes(query.toLowerCase());

export const filterByDuration = (duration) => duration <= 40;
