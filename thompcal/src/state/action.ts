export namespace Command {
  export const enum Month {
    ChooseMonth = 0,
  }

  export const enum Login {
    LogIn = 1,
    LogOut = 2,
    UpdatePassword = 3,
    UpdateError = 4,
    StartLoading = 5,
    StopLoading = 6,
  }

  export const enum Add {
    ChooseFamily = 7,
    UpdateQuote = 8,
    UpdateStatus = 10,
    UpdateWarnings = 11,
    StartLoading = 12,
    StopLoading = 13,
  }

  export type General = Month | Login | Add;
}

// enum Command {
//   ChooseMonth,

//   LogIn,
//   LogOut,
//   UpdatePassword,
//   UpdateError,
//   StartLoginLoading,
//   StopLoginLoading,

//   ChooseFamily,
//   UpdateQuote,
//   UpdateStatus,
//   UpdateWarnings,
//   StartAddLoading,
//   StopAddLoading,
// }

type Month = {
  command: Command.Month.ChooseMonth;
  payload: number;
};

type Login =
  | { command: Command.Login.LogIn }
  | { command: Command.Login.LogOut }
  | { command: Command.Login.UpdatePassword; payload: string }
  | { command: Command.Login.UpdateError; payload: string }
  | { command: Command.Login.StartLoading }
  | { command: Command.Login.StopLoading };

type Add =
  | { command: Command.Add.ChooseFamily; payload: number }
  | { command: Command.Add.UpdateQuote; payload: string }
  | { command: Command.Add.UpdateStatus; payload: string }
  | {
      command: Command.Add.UpdateWarnings;
      payload: [boolean, boolean, boolean];
    }
  | { command: Command.Add.StartLoading }
  | { command: Command.Add.StopLoading };

type Action = Month | Login | Add;

export type { Action };

// enum Command {
//   ChooseMonth,

//   LogIn,
//   LogOut,
//   UpdatePassword,
//   UpdateLoginError,
//   StartLoginLoading,
//   StopLoginLoading,

//   ChooseFamily,
//   UpdateQuote,
//   UpdateSubmitStatus,
//   UpdateSubmitWarnings,
//   StartSubmitLoading,
//   StopSubmitLoading,
// }

// type MonthAction = {
//   command: Command.Month.ChooseMonth;
//   payload: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
// };

// type LoginAction =
//   | { command: Command.Login.LogIn }
//   | { command: Command.Login.LogOut }
//   | { command: Command.Login.UpdatePassword; payload: string }
//   | { command: Command.Login.UpdateError; payload: string }
//   | { command: Command.Login.StartLoading }
//   | { command: Command.Login.StopLoading };

// type Action =
//   | {
//       command: Command.ChooseMonth;
//       payload: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
//     }
//   | { command: Command.LogIn }
//   | { command: Command.LogOut }
//   | { command: Command.UpdatePassword; payload: string }
//   | { command: Command.UpdateLoginError; payload: string }
//   | { command: Command.StartLoginLoading }
//   | { command: Command.StopLoginLoading }
//   | { command: Command.ChooseFamily; payload: 0 | 1 | 2 | 3 | 4 | 5 | 6 }
//   | { command: Command.UpdateQuote; payload: string }
//   | { command: Command.UpdateSubmitStatus; payload: string }
//   | {
//       command: Command.UpdateSubmitWarnings;
//       payload: [boolean, boolean, boolean];
//     }
//   | { command: Command.StartSubmitLoading }
//   | { command: Command.StopSubmitLoading };
