import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });
  const [emailRegistered, setEmailRegis] = useState(false);
  let isEmailRegistered = false;
  const navigate = useNavigate();
  // make a login request
  const login = async (data) => {
    const result = await axios.post("http://localhost:4000/auth/login", data);
    const token = result.data.token;
    localStorage.setItem("token", token);
    const DataFromToken = jwtDecode(token);
    console.log(DataFromToken);
    setState({ ...state, user: DataFromToken });
    navigate("/");
  };

  // register the user
  const register = async (data) => {
    const result = await axios.post(
      "http://localhost:4000/auth/register",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (result.data.success === true) {
      navigate("/");
    } else {
      setEmailRegis(true);
    }
  };

  // clear the token in localStorage and the user data
  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/login");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        isEmailRegistered,
        emailRegistered,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
