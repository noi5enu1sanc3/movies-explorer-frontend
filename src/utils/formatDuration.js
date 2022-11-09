const WORDS = ["минута", "минуты", "минут"];

const formatWord = (durationInMinutes, words) => {
  const num = durationInMinutes % 10;
  if (durationInMinutes > 10 && durationInMinutes < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};

export const formatDuration = (durationInMinutes) => {
  if (durationInMinutes < 60) {
    return `${durationInMinutes} ${formatWord(durationInMinutes, WORDS)}`;
  }

  const hours = parseInt(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  if (minutes === 0) {
    return `${hours}ч`;
  }
  return `${hours}ч ${minutes}м`;
};
