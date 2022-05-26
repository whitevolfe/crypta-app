import { IAuthContext } from "./AuthContext";

interface IAuthAction {
  type: "LOGIN" | "LOGOUT" | "SET_TOKEN" | "SET_AUTHENTICATED" | "RESET_ERROR" | "SET_ERROR" | "SET_LOADING";
  payload: any;
}

export default function AuthReducer(state: IAuthContext, action: IAuthAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        token: "",
        isAuthenticated: false,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };

    case "SET_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case "RESET_ERROR":
      return {
        ...state,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
