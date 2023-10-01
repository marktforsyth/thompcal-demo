import { ReactElement, useEffect, useMemo, useReducer } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import dayjs from "dayjs";

import Styles from "./shared-logic/styles";
import Colors from "./shared-logic/colors";
import Events from "./pages/Events";
import Quotes from "./pages/Quotes";
import LogIn from "./components/LogIn";
import Settings from "./pages/Settings";
import RouteNotFound from "./components/RouteNotFound";
import { getAuth, User } from "firebase/auth";
import AddQuote from "./pages/AddQuote";
import MainContainer from "./components/MainContainer";
import reducer from "./state/reducer";
import { Command } from "./state/action";
import { State } from "./state/state";

const App = (): ReactElement => {
  const initialState: State = {
    month: {
      monthIndex: useMemo((): number => parseInt(dayjs().format("M")), []),
    },
    login: {
      password: "",
      error: "",
      loading: true,
      loggedIn: false,
    },
    add: {
      familyIndex: 6,
      quote: "",
      loading: false,
      status: "",
      warnings: [false, false, false],
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const styles: Styles = {
    body: {
      backgroundColor: Colors.Background,
      letterSpacing: "1px",
      lineHeight: "1.5",
      width: "100vw",
    },
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainContainer>
          <Outlet />
        </MainContainer>
      ),
      errorElement: (
        <MainContainer>
          <RouteNotFound />
        </MainContainer>
      ),
      children: [
        {
          path: "",
          element: <Quotes state={state.month} dispatch={dispatch} />,
        },
        {
          path: "/events",
          element: <Events state={state.month} dispatch={dispatch} />,
        },
        {
          path: "/add",
          element: <AddQuote state={state.add} dispatch={dispatch} />,
        },
        {
          path: "/settings",
          element: <Settings state={state.month} dispatch={dispatch} />,
        },
      ],
    },
  ]);

  const auth = getAuth();
  useEffect((): void => {
    auth.onAuthStateChanged((user: User | null): void => {
      if (user) {
        dispatch({ command: Command.Login.LogIn });
      }
    });
  }, []);

  return (
    <div style={styles.body}>
      {state.login.loggedIn ? (
        <RouterProvider router={router} />
      ) : (
        <LogIn state={state.login} dispatch={dispatch} />
      )}
    </div>
  );
};

export default App;
