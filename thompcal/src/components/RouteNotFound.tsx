import { ReactElement } from "react";
import Styles from "../shared-logic/styles";

const RouteNotFound = (): ReactElement => {
  const styles: Styles = {
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100%",
    },
    title: {
      fontSize: "4rem",
    },
    subtitle: {
      fontSize: "2rem",
    },
  };
  return (
    <div style={styles.main}>
      <div style={styles.title}>404</div>
      <div style={styles.subtitle}>Page not found</div>
    </div>
  );
};

export default RouteNotFound;
