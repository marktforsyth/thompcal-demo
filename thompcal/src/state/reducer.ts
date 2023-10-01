import { State, Month, Login, Add } from "./state";
import { Action, Command } from "./action";

const month = (state: Month, action: Action): Month => {
  switch (action.command) {
    case Command.Month.ChooseMonth:
      return { ...state, monthIndex: action.payload };
    default:
      return state;
  }
};

const login = (state: Login, action: Action): Login => {
  switch (action.command) {
    case Command.Login.LogIn:
      return { ...state, loggedIn: true };
    case Command.Login.LogOut:
      return { ...state, loggedIn: false };
    case Command.Login.UpdatePassword:
      return { ...state, password: action.payload };
    case Command.Login.UpdateError:
      return { ...state, error: action.payload };
    case Command.Login.StartLoading:
      return { ...state, loading: true };
    case Command.Login.StopLoading:
      return { ...state, loading: false };
    default:
      return state;
  }
};

const add = (state: Add, action: Action): Add => {
  switch (action.command) {
    case Command.Add.ChooseFamily:
      return { ...state, familyIndex: action.payload };
    case Command.Add.UpdateQuote:
      return { ...state, quote: action.payload };
    case Command.Add.UpdateStatus:
      return { ...state, status: action.payload };
    case Command.Add.UpdateWarnings:
      return { ...state, warnings: action.payload };
    case Command.Add.StartLoading:
      console.log("Beginning to load");
      return { ...state, loading: true };
    case Command.Add.StopLoading:
      console.log("Ending to load");
      return { ...state, loading: false };
    default:
      return state;
  }
};

const reducer = (state: State, action: Action): State => ({
  month: month(state.month, action),
  login: login(state.login, action),
  add: add(state.add, action),
});

export default reducer;
