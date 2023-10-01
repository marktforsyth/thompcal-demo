import Colors from "./colors";
import Styles from "./styles";

const commonStyles: Styles = {
  title: {
    fontSize: "2rem",
    textAlign: "center",
    margin: "1rem 0 1.5rem 0",
  },
  element: {
    backgroundColor: Colors.Element,
    borderRadius: "1.5rem",
    padding: "1rem",
    marginBottom: "0.5rem",
    fontSize: "1.2rem",
    width: "calc(100vw - 3rem)",
    maxWidth: "37rem",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))",
    gridGap: "0.5rem",
    width: "calc(100vw - 1rem)",
    maxWidth: "39rem",
    marginBottom: "2rem",
  },
  gridBtn: {
    backgroundColor: Colors.Element,
    borderRadius: "1.5rem",
    padding: "1rem",
    fontSize: "1.5rem",
    textAlign: "center",
    border: "3px solid transparent",
    cursor: "pointer",
  },
  activeGridBtn: {
    backgroundColor: "transparent",
    borderRadius: "1.5rem",
    padding: "1rem",
    fontSize: "1.5rem",
    textAlign: "center",
    border: `3px solid ${Colors.Text}`,
    cursor: "pointer",
  },
};

export default commonStyles;
