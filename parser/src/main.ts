import { readFile, writeFile } from "fs";
import prepData from "./logic/prepare-data";
import parseQuotes from "./logic/quotes";
import parseEvents from "./logic/events";

const main = (): void => {
  readFile(
    "data/thompcal23.tsv", // this doesn't exist in the demo
    "utf8",
    (err: NodeJS.ErrnoException | null, data: string): void => {
      if (err) {
        throw Error(
          `Could not read the thompcal22.tsv data file while parsing.\n${err}`,
        );
      }

      const cells = prepData(data);
      const quotes = parseQuotes(cells);
      const events = parseEvents(cells);

      writeFile(
        "../thompcal/data/quotes.json",
        JSON.stringify(quotes),
        (err: NodeJS.ErrnoException | null): void => {
          if (err) {
            throw Error(
              `Could not write the quotes to output/quotes.json.\n${err}`,
            );
          }
        },
      );
      writeFile(
        "../thompcal/data/events.json",
        JSON.stringify(events),
        (err: NodeJS.ErrnoException | null): void => {
          if (err) {
            throw Error(
              `Could not write the events to output/events.json.\n${err}`,
            );
          }
        },
      );
    },
  );
};

main();
