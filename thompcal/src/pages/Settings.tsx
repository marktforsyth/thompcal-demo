import { ReactElement } from "react";
import Colors from "../shared-logic/colors";
import Styles from "../shared-logic/styles";
import commonStyles from "../shared-logic/common-styles";
import { Auth, getAuth, signOut } from "firebase/auth";
import { Month } from "../state/state";
import { Action, Command } from "../state/action";

type Props = {
  state: Month;
  dispatch: (action: Action) => void;
};

type SignOutError = {
  code: string;
  message: string;
};

const attemptLogOut = (
  auth: Auth,
  dispatch: (action: Action) => void,
): void => {
  signOut(auth)
    .then((): void => {
      dispatch({ command: Command.Login.LogOut });
    })
    .catch((err: SignOutError): void => {
      alert("There was an error signing out, go talk to Mark.");
      console.error(`${err.code}\n${err.message}`);
    });
};

const renderMonths = (
  months: string[],
  styles: Styles,
  monthIndex: number,
  dispatch: (action: Action) => void,
): ReactElement[] => {
  return months.map((month: string, m: number): ReactElement => {
    return (
      <div
        style={m + 1 === monthIndex ? styles.activeMonthBtn : styles.monthBtn}
        key={`month-choice-${m}`}
        onClick={() =>
          dispatch({ command: Command.Month.ChooseMonth, payload: m + 1 })
        }
      >
        {month}
      </div>
    );
  });
};

const Settings = ({ state, dispatch }: Props): ReactElement => {
  const styles: Styles = {
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: commonStyles.title,
    subtitle: commonStyles.subtitle,
    monthsContainer: commonStyles.gridContainer,
    monthBtn: commonStyles.gridBtn,
    activeMonthBtn: commonStyles.activeGridBtn,
    logOutBtn: {
      backgroundColor: Colors.Element,
      padding: "1rem 3rem 1rem 3rem",
      borderRadius: "1.5rem",
      textAlign: "center",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const auth = getAuth();

  return (
    <div style={styles.main}>
      <div style={styles.title}>Settings</div>
      <div style={styles.monthsContainer}>
        {renderMonths(months, styles, state.monthIndex, dispatch)}
      </div>
      <div
        style={styles.logOutBtn}
        onClick={() => {
          attemptLogOut(auth, dispatch);
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Settings;
