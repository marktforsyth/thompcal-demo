import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import commonStyles from "../shared-logic/common-styles";
import Styles from "../shared-logic/styles";
import { Action, Command } from "../state/action";
import { Month } from "../state/state";
import dayjs from "dayjs";

type Props = {
  state: Month;
  dispatch: (action: Action) => void;
};

const mod = (n: number, m: number): number => {
  // TODO: make shared logic
  if (n < 0) {
    return (n % m) + m;
  }

  return n % m;
};

const MonthTitle = ({ state, dispatch }: Props): ReactElement => {
  const styles: Styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      ...commonStyles.title,
      width: "60vw",
      minWidth: "13rem",
      maxWidth: "20rem",
    },
    arrow: {
      fontSize: "2rem",
      cursor: "pointer",
    },
  };

  const fullMonth = dayjs(`2001/${state.monthIndex}/1`).format("MMMM");

  return (
    // TODO: style these to edges of screen (move less)
    <div style={styles.container}>
      <FontAwesomeIcon
        style={styles.arrow}
        icon={faArrowLeft}
        onClick={(): void =>
          dispatch({
            command: Command.Month.ChooseMonth,
            payload: mod(state.monthIndex - 2, 12) + 1,
          })
        }
      />
      <div style={styles.title}>{fullMonth}</div>
      <FontAwesomeIcon
        style={styles.arrow}
        icon={faArrowRight}
        onClick={(): void =>
          dispatch({
            command: Command.Month.ChooseMonth,
            payload: mod(state.monthIndex, 12) + 1,
          })
        }
      />
    </div>
  );
};

export default MonthTitle;
