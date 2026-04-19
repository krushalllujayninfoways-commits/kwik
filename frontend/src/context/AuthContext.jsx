import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        dispatch({ type: "LOGIN", payload: { token, user: JSON.parse(user) } });
      } catch {
        localStorage.clear();
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: { token, user } });
    return res.data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  }, []);

  const register = useCallback(async (formData) => {
    const res = await api.post("/auth/register", formData);
    return res.data;
  }, []);

  const verifyOtp = useCallback(async (email, otp) => {
    const res = await api.post("/auth/verify-otp", { email, otp });
    return res.data;
  }, []);

  const resendOtp = useCallback(async (email) => {
    const res = await api.post("/auth/resend-otp", { email });
    return res.data;
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, verifyOtp, resendOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
