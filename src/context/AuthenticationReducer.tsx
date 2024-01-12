import { IState, IAction } from "./AuthenticationProvider";
import { AuthenticationActionTypes } from "./AuthenticationProvider";

export const AuthenticationReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case AuthenticationActionTypes.SET_LOGGED_EMPLOYEE: {
      console.log("Action: SET_LOGGED_EMPLOYEE");
      return {
        ...state,
        isAuthenticated: true,
        userData: action.user,
      };
    }
    case AuthenticationActionTypes.LOGOUT_EMPLOYEE: {
      console.log("Action: LOGOUT_EMPLOYEE");
      return {
        ...state,
        isAuthenticated: false,
        userData: {
          userName: "",
          userEmail: "",
        },
      };
    }
  }
};
