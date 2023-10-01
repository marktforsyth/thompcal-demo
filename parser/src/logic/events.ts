type CalendarEvent = {
  subject: string;
  date: [string, number];
};

const nameSubject = (rawSubject: string): string => {
  switch (rawSubject) {
    case "Aaardvarkian Weasal III":
      return "Aardvark";
    case "Dr. Pigeon B.":
      return "Pigeon";
    default:
      return rawSubject;
  }
};

const parseEvents = (cells: Array<string>): Array<CalendarEvent> => {
  const rawDatesAndPeople = cells.filter((cell: string, c: number): boolean => {
    const row = Math.floor(c / 85);

    const withinRow = row < 16 && row > 0;
    const notBlank = cell !== "";
    const notKey =
      !cell.includes("Darker blue:") && !cell.includes("Cover photo below:");
    return withinRow && notBlank && notKey;
  });
  const range = [...Array(rawDatesAndPeople.length / 2).keys()];

  const events = range.map((c: number): CalendarEvent => {
    const rawDate = rawDatesAndPeople[c * 2];
    const splitDate = rawDate.split(" ");

    const date: [string, number] = [
      splitDate[0].slice(0, 3),
      parseInt(splitDate[1]),
    ];

    const rawSubject = rawDatesAndPeople[c * 2 + 1];
    const subject = nameSubject(rawSubject);

    return {
      subject,
      date,
    };
  });

  return events;
};

export default parseEvents;
