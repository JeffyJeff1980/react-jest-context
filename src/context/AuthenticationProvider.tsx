import React, { createContext, useReducer, useContext } from "react";
import { AuthenticationReducer } from "./AuthenticationReducer";

export enum AuthenticationActionTypes {
  SET_LOGGED_EMPLOYEE = "SET_LOGGED_EMPLOYEE",
  LOGOUT_EMPLOYEE = "LOGOUT_EMPLOYEE",
}

interface ILoginAction {
  type: AuthenticationActionTypes.SET_LOGGED_EMPLOYEE;
  user: IUserData;
}

interface ILogoutAction {
  type: AuthenticationActionTypes.LOGOUT_EMPLOYEE;
}

export type IAction = ILoginAction | ILogoutAction;

export interface IUserData {
  userName: string;
  userEmail: string;
}

export interface IState {
  isAuthenticated: boolean;
  userData: IUserData;
}

type Dispatch = (action: IAction) => void;

// separate contexts for the state and dispatch
const AuthenticationStateContext = createContext<IState | undefined>(undefined);
const AuthenticationDispatchContext = createContext<Dispatch | undefined>(undefined);

// custom hook for the state
export const useAuthenticationStateContext = () => {
  const context = useContext(AuthenticationStateContext);
  if (context === undefined) {
    throw new Error("useAuthenticationStateContext must be used within a AuthenticationStateContext.Provider");
  }
  return context;
};

// custom hook for the dispatch
export const useAuthenticationDispatchContext = () => {
  const context = useContext(AuthenticationDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthenticationDispatchContext must be used within a AuthenticationDispatchContext.Provider");
  }
  return context;
};

export const AuthenticationProvider = ({ children }: any) => {
  const initialState: IState = {
    isAuthenticated: false,
    userData: {
      userName: "",
      userEmail: "",
    },
  };

  const [state, dispatch] = useReducer(AuthenticationReducer, initialState);

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationDispatchContext.Provider value={dispatch}>{children}</AuthenticationDispatchContext.Provider>
    </AuthenticationStateContext.Provider>
  );
};
