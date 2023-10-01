import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteRight,
  faCalendarCheck,
  faPlus,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Colors from "../shared-logic/colors";
import Styles from "../shared-logic/styles";

type Style = {
  [attribute: string]: string;
};

const Nav = (): ReactElement => {
  const styles: Styles = {
    nav: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "5rem",
      width: "100vw",
      position: "fixed",
      bottom: "0",
      backgroundColor: Colors.Background,
    },
    navItems: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      maxWidth: "30rem",
      width: "100vw",
    },
    button: {
      fontSize: "1.5rem",
      backgroundColor: "transparent",
      textDecoration: "none",
      color: Colors.Text,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: Colors.Text,
      fontSize: "1.5rem",
      padding: "0.5rem 1.5rem 0.5rem 1.5rem",
      borderRadius: "1.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    activeIcon: {
      color: Colors.Text,
      backgroundColor: Colors.Element,
      fontSize: "1.5rem",
      padding: "0.5rem 1.5rem 0.5rem 1.5rem",
      borderRadius: "1.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.nav}>
      <div style={styles.navItems}>
        <NavLink
          style={({ isActive }): Style =>
            isActive ? styles.activeIcon : styles.icon
          }
          to="/"
        >
          <FontAwesomeIcon icon={faQuoteRight} />
        </NavLink>
        <NavLink
          style={({ isActive }): Style =>
            isActive ? styles.activeIcon : styles.icon
          }
          to="/events"
        >
          <FontAwesomeIcon icon={faCalendarCheck} />
        </NavLink>
        <NavLink
          style={({ isActive }): Style =>
            isActive ? styles.activeIcon : styles.icon
          }
          to="/add"
        >
          <FontAwesomeIcon icon={faPlus} />
        </NavLink>
        <NavLink
          style={({ isActive }): Style =>
            isActive ? styles.activeIcon : styles.icon
          }
          to="/settings"
        >
          <FontAwesomeIcon icon={faGear} />
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
