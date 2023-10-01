const parseQuotes = (cells: Array<string>): Array<string> => {
  const quotes = cells.filter((cell: string, c: number): boolean => {
    const row = Math.floor(c / 85);

    const withinRow = row < 30 && row > 18;
    const notNumber = !cell.match(/\d/);
    const notBlank = cell !== "";
    const notAnniversary = cell.split(" ").length > 4 || !cell.includes("&");

    return withinRow && notNumber && notBlank && notAnniversary;
  });

  return quotes;
};

export default parseQuotes;
