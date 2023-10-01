import {
  PropsWithChildren,
  ReactElement,
  RefObject,
  useLayoutEffect,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";
import Colors from "../shared-logic/colors";
import Styles from "../shared-logic/styles";
import Nav from "./Nav";

const MainContainer = ({ children }: PropsWithChildren): ReactElement => {
  const location = useLocation();
  const styles: Styles = {
    mainContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100vw",
      // height: "100vh",
      // position: "fixed",
    },
    main: {
      color: Colors.Text,
      padding: "0.5rem 0 5rem 0",
      // overflowY: "scroll",
      maxWidth: "40rem",
    },
  };

  useLayoutEffect((): void => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div style={styles.mainContainer}>
      <div style={styles.main}>{children}</div>
      <Nav />
    </div>
  );
};

export default MainContainer;
