import { ReactElement } from "react";
import Styles from "../shared-logic/styles";
import commonStyles from "../shared-logic/common-styles";
import quotes from "../../data/quotes.json";
import MonthTitle from "../components/MonthTitle";
import { Action } from "../state/action";
import { Month } from "../state/state";

type Props = {
  state: Month;
  dispatch: (action: Action) => void;
};

const pickQuotes = (monthIndex: number): string[] => {
  return quotes.filter(
    (_quote: String, q: number): boolean => q % 12 == monthIndex,
  );
};

const renderQuotes = (styles: Styles, monthIndex: number): ReactElement[] => {
  return pickQuotes(monthIndex).map(
    (quote: string, q: number): ReactElement => {
      return (
        <div style={styles.element} key={`quote-${q}`}>
          {quote}
        </div>
      );
    },
  );
};

const Quotes = ({ state, dispatch }: Props): ReactElement => {
  const styles: Styles = {
    title: commonStyles.title,
    element: commonStyles.element,
  };

  return (
    <div>
      <MonthTitle state={state} dispatch={dispatch} />
      {renderQuotes(styles, state.monthIndex - 1)}
    </div>
  );
};

export default Quotes;
