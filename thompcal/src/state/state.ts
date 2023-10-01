type Month = {
  monthIndex: number;
};

type Login = {
  password: string;
  error: string;
  loading: boolean;
  loggedIn: boolean;
};

type Add = {
  familyIndex: number;
  quote: string;
  loading: boolean;
  status: string;
  warnings: [boolean, boolean, boolean];
};

type State = {
  month: Month;
  login: Login;
  add: Add;
};

export type { State, Month, Login, Add };
