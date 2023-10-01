import { ReactElement, useMemo } from "react";
import dayjs from "dayjs";
import { Database, getDatabase, set, ref, push } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Offline, Online } from "react-detect-offline";

import commonStyles from "../shared-logic/common-styles";
import Colors from "../shared-logic/colors";
import Styles from "../shared-logic/styles";
import { Add } from "../state/state";
import { Action, Command } from "../state/action";

type Props = {
  state: Add;
  dispatch: (action: Action) => void;
};

type SubmissionError = {
  code: string;
  message: string;
};

const attemptQuoteSubmission = (
  quote: string,
  year: string,
  db: Database,
  dispatch: (action: Action) => void,
  realDate: string,
  family: string,
): void => {
  if (quote === "") {
    return;
  }

  dispatch({ command: Command.Add.StartLoading });

  const yearRef = ref(db, year);
  const newQuote = push(yearRef);

  set(newQuote, { family, timestamp: realDate, quote: quote.trim() })
    .then((): void => {
      dispatch({
        command: Command.Add.UpdateStatus,
        payload: "Submission successful",
      });
      dispatch({ command: Command.Add.UpdateQuote, payload: "" });
      dispatch({ command: Command.Add.StopLoading });
    })
    .catch((err: SubmissionError): void => {
      dispatch({
        command: Command.Add.UpdateStatus,
        payload: `Something went wrong! Tell Mark this error code: ${err.code}`,
      });
      dispatch({ command: Command.Add.StopLoading });
    });
};

const handleChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  dispatch: (action: Action) => void,
): void => {
  dispatch({ command: Command.Add.UpdateStatus, payload: "" });
  dispatch({
    command: Command.Add.UpdateQuote,
    payload: makeCapitalIfColon(event.target.value),
  });
  dispatch({
    command: Command.Add.UpdateWarnings,
    payload: checkForWarnings(event.target.value),
  });
};

const handleKeyDown = (
  event: React.KeyboardEvent<HTMLTextAreaElement>,
): void => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};

const renderFamilies = (
  styles: Styles,
  familyIndex: number,
  dispatch: (action: Action) => void,
  families: string[],
): ReactElement[] => {
  return families.map((family: string, f: number): ReactElement => {
    return (
      <div
        style={f === familyIndex ? styles.activeFamilyBtn : styles.familyBtn}
        key={`family-choice-${f}`}
        onClick={(): void => {
          dispatch({ command: Command.Add.ChooseFamily, payload: f });
        }}
      >
        {family}
      </div>
    );
  });
};

const checkForWarnings = (quote: string): [boolean, boolean, boolean] => {
  const warnings: [boolean, boolean, boolean] = [
    /"/.test(quote) ? true : false,
    /(?!\.).\.\.\.(?!\.)$/.test(quote) ? true : false,
    /:\.\.\./.test(quote) ? true : false,
  ];

  return warnings;
};

const renderWarnings = (
  warnings: [boolean, boolean, boolean],
  styles: Styles,
): ReactElement[] => {
  const warningTexts = [
    "Only use quote marks in references, sacrasm or hyperbole.",
    "If the quote ends in an ellipses, use four dots instead of three.",
    "Put a space between the colon and the ellipses.",
  ];

  const chosen = [...warnings.entries()]
    .filter(([_w, warning]: [number, boolean]): boolean => warning)
    .map(([w, _warning]: [number, boolean]): number => w);

  return chosen.map(
    (w: number): ReactElement => (
      <div key={`warning-add-quote-${w}`} style={styles.element}>
        <div style={styles.warningSymbol}>
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </div>
        <div>{warningTexts[w]}</div>
      </div>
    ),
  );
};

const makeCapitalIfColon = (text: string): string => {
  const upToEnd = text.slice(0, -1);
  if (upToEnd.trim().endsWith(":")) {
    return upToEnd + text.slice(-1).toUpperCase();
  }

  return text;
};

const AddQuote = ({ state, dispatch }: Props): ReactElement => {
  const realDate = useMemo((): string => dayjs().format("MM-DD-YYYY H:m"), []); // TODO: memoize?
  const year = useMemo((): string => dayjs().add(11, "day").format("YYYY"), []);
  const db = getDatabase();

  const styles: Styles = {
    main: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    loadingMain: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 6.5rem)",
    },
    offlineMain: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 6.5rem)",
      padding: "0.5rem",
      textAlign: "center",
      fontSize: "1.2rem",
    },
    title: commonStyles.title,
    element: { ...commonStyles.element, display: "flex", alignItems: "center" },
    warningSymbol: {
      marginRight: "1rem",
      display: "flex",
      alignItems: "center",
      fontSize: "2rem",
    },
    familiesContainer: {
      ...commonStyles.gridContainer,
      gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
    },
    familyBtn: commonStyles.gridBtn,
    activeFamilyBtn: commonStyles.activeGridBtn,
    quoteInput: {
      padding: "1rem",
      borderRadius: "1.5rem",
      border: "none",
      color: Colors.Text,
      fontSize: "1.2rem",
      backgroundColor: Colors.Element,
      width: "calc(100vw - 3rem)",
      maxWidth: "37rem",
      height: "8rem",
      resize: "none",
      fontFamily: "inherit",
      marginBottom: "1rem",
      lineHeight: "1.5",
    },
    submitBtn: {
      padding: "1rem 3rem 1rem 3rem",
      borderRadius: "1.5rem",
      backgroundColor: Colors.Element,
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    loadingSpinner: {
      fontSize: "4rem",
    },
    statusMsg: {
      textAlign: "center",
      marginBottom: state.status === "" ? "0" : "1rem",
    },
  };

  const families = [
    "Aardvark+",
    "Xylophone+",
    "Windowsill+",
    "Noone+",
    "Pigeon+",
    "Moose+",
    "Gpas",
  ];
  const family = families[state.familyIndex];

  return (
    <div>
      <Online>
        <div>
          {state.loading ? (
            <div style={styles.loadingMain}>
              <FontAwesomeIcon
                style={styles.loadingSpinner}
                icon={faSpinner}
                spin
              />
            </div>
          ) : (
            <div style={styles.main}>
              <div style={styles.title}>New Quote {year}</div>
              <div style={styles.familiesContainer}>
                {renderFamilies(styles, state.familyIndex, dispatch, families)}
              </div>
              {renderWarnings(state.warnings, styles)}
              {state.status !== "" ? (
                <div style={styles.statusMsg}>{state.status}</div>
              ) : null}
              <textarea
                style={styles.quoteInput}
                value={state.quote}
                placeholder="Person A: Comment. Person B: Reply."
                onChange={(
                  event: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => handleChange(event, dispatch)}
                onKeyDown={(
                  event: React.KeyboardEvent<HTMLTextAreaElement>,
                ): void => handleKeyDown(event)}
              ></textarea>
              <div
                style={styles.submitBtn}
                onClick={(): void =>
                  attemptQuoteSubmission(
                    state.quote,
                    year,
                    db,
                    dispatch,
                    realDate,
                    family,
                  )
                }
              >
                Submit
              </div>
            </div>
          )}
        </div>
      </Online>
      <Offline>
        <div style={styles.offlineMain}>
          <div style={styles.main}>
            <div style={commonStyles.title}>You're offline</div>
            <div>
              You can start submitting quotes again when you come back online
            </div>
          </div>
        </div>
      </Offline>
    </div>
  );
};

export default AddQuote;
