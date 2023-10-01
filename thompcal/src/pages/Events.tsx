import { ReactElement } from "react";
import dayjs from "dayjs";
import Styles from "../shared-logic/styles";
import events from "../../data/events.json";
import commonStyles from "../shared-logic/common-styles";
import Colors from "../shared-logic/colors";
import images from "../shared-logic/images";
import MonthTitle from "../components/MonthTitle";
import { Month } from "../state/state";
import { Action } from "../state/action";

type CalendarEvent = {
  subject: string;
  date: (string | number)[];
};

type Props = {
  state: Month;
  dispatch: (action: Action) => void;
};

const pickEvents = (monthShort: string): CalendarEvent[] => {
  return events.filter((event: CalendarEvent): boolean => {
    return event.date[0] === monthShort;
  });
};

const renderEvents = (styles: Styles, monthShort: string): ReactElement[] => {
  const eventsThisMonth = pickEvents(monthShort);

  return eventsThisMonth.map(
    (event: CalendarEvent, e: number): ReactElement => {
      if (event.subject.includes("&")) {
        return (
          <div style={styles.element} key={`anniversary-${e}`}>
            <div>{event.date.join(" ")}</div>
            <div style={styles.eventText}>
              Happy anniversary {event.subject}!
            </div>
          </div>
        );
      }

      return (
        <div style={styles.picElement} key={`birthday-${e}`}>
          <img style={styles.profile} src={images[event.subject]}></img>
          <div>
            <div>{event.date.join(" ")}</div>
            <div style={styles.eventText}>Happy birthday {event.subject}!</div>
          </div>
        </div>
      );
    },
  );
};

const Events = ({ state, dispatch }: Props): ReactElement => {
  const styles: Styles = {
    title: commonStyles.title,
    element: commonStyles.element,
    picElement: {
      ...commonStyles.element,
      display: "flex",
      alignItems: "center",
    },
    profile: {
      backgroundColor: Colors.Background,
      minWidth: "4rem",
      marginRight: "1rem",
      height: "4rem",
      borderRadius: "0.5rem",
    },
    eventText: {
      fontSize: "1.5rem",
    },
  };

  const monthShort = dayjs(`2001/${state.monthIndex}/1`).format("MMM");

  return (
    <div>
      <MonthTitle state={state} dispatch={dispatch} />
      {renderEvents(styles, monthShort)}
    </div>
  );
};

export default Events;
