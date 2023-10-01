import React, { ReactElement, useEffect } from "react";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Styles from "../shared-logic/styles";
import Colors from "../shared-logic/colors";
import { Login, State } from "../state/state";
import { Action, Command } from "../state/action";

type SignInError = {
  code: string;
  message: string;
};

type Props = {
  state: Login;
  dispatch: (action: Action) => void;
};

const renderError = (error: string): string => {
  switch (error) {
    case "auth/wrong-password":
      return "Password incorrect";
    case "auth/too-many-requests":
      return "Too many attempts; try again later";
    default:
      return `Something went wrong! Tell Mark this error code: ${error}`;
  }
};

const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: (action: Action) => void,
): void => {
  dispatch({
    command: Command.Login.UpdatePassword,
    payload: event.target.value,
  });
};

const handleKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  auth: Auth,
  state: Login,
  dispatch: (action: Action) => void,
): void => {
  if (event.key === "Enter") {
    attemptLogIn(auth, state.password, dispatch);
  }
};

const attemptLogIn = (
  auth: Auth,
  password: string,
  dispatch: (action: Action) => void,
): void => {
  if (password === "") {
    return;
  }

  dispatch({ command: Command.Login.StartLoading });

  signInWithEmailAndPassword(auth, "marktforsyth@gmail.com", password)
    .then((_userCredential: UserCredential): void => {
      dispatch({ command: Command.Login.LogIn });
      dispatch({ command: Command.Login.StopLoading });
    })
    .catch((error: SignInError): void => {
      const errorCode = error.code;

      dispatch({ command: Command.Login.StopLoading });
      dispatch({ command: Command.Login.UpdateError, payload: errorCode });
      dispatch({ command: Command.Login.UpdatePassword, payload: "" });
    });
};

const LogIn = ({ state, dispatch }: Props): ReactElement => {
  const auth = getAuth();
  const styles: Styles = {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
    },
    main: {
      position: "fixed",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "calc(100vh - 1rem)",
      width: "calc(100vw - 1rem)",
      maxWidth: "39rem",
      color: Colors.Text,
      padding: "0.5rem",
    },
    title: {
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "2rem",
    },
    password: {
      borderRadius: "1.5rem",
      height: "1.5rem",
      width: "calc(100vw - 3rem)",
      maxWidth: "37rem",
      padding: "1rem",
      fontSize: "1.2rem",
      marginBottom: "1rem",
      backgroundColor: Colors.Element,
      border: "none",
      fontFamily: "inherit",
      color: "inherit",
      textAlign: "center",
      letterSpacing: "inherit",
    },
    logInBtn: {
      backgroundColor: Colors.Element,
      padding: "1rem 3rem 1rem 3rem",
      textAlign: "center",
      borderRadius: "1.5rem",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    error: {
      textAlign: "center",
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    loadingSpinner: {
      fontSize: "4rem",
    },
  };

  useEffect((): void => {
    auth.onAuthStateChanged((user: User | null): void => {
      if (!user) {
        dispatch({ command: Command.Login.StopLoading });
      }
    });
  }, []);

  return (
    <div style={styles.mainContainer}>
      {state.loading ? (
        <div style={styles.main}>
          <FontAwesomeIcon
            style={styles.loadingSpinner}
            icon={faSpinner}
            spin
          />
        </div>
      ) : (
        <div style={styles.main}>
          <div style={styles.title}>Thompson Calendar</div>
          <input
            style={styles.password}
            type="password"
            placeholder="Enter password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
              handleChange(event, dispatch)
            }
            value={state.password}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void =>
              handleKeyDown(event, auth, state, dispatch)
            }
          ></input>
          <div
            style={styles.logInBtn}
            onClick={(): void => {
              attemptLogIn(auth, state.password, dispatch);
            }}
          >
            Log In
          </div>
          {state.error !== "" ? (
            <div style={styles.error}>{renderError(state.error)}</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LogIn;
