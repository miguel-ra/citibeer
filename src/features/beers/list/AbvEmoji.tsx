const abvRanges = [
  {
    range: [-1, 3],
    emoji: "🙂",
    label: "Alcohol by volume less than or equal to 3%",
  },
  {
    range: [3, 8],
    emoji: "😊",
    label: "Alcohol by volume less than or equal to 8% but greater than 3%",
  },
  {
    range: [8, 15],
    emoji: "🥴",
    label: "Alcohol by volume less than or equal to 15% but greater than 8%",
  },
  {
    range: [15, Infinity],
    emoji: "🤢",
    label: "Alcohol by volume greater than 15%",
  },
];

function AbvEmoji({ abv = 0 }) {
  const abvMatch =
    abvRanges.find(({ range }) => abv > range[0] && abv <= range[1]) ||
    abvRanges[0];

  return (
    <span role="img" aria-label={abvMatch.label} title={abvMatch.label}>
      {abvMatch.emoji}
    </span>
  );
}

export default AbvEmoji;
