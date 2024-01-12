import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  AuthenticationActionTypes,
  useAuthenticationDispatchContext,
  useAuthenticationStateContext,
} from "./context/AuthenticationProvider";

function App() {
  // TODO : Use context state instead of local state
  // const { authState } = useAuthenticationStateContext();
  // const { authDispatch } = useAuthenticationStateContext();

  const { isAuthenticated, userData } = useAuthenticationStateContext();
  const dispatch = useAuthenticationDispatchContext();

  // TODO : Use context state instead of local state
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      email: { value: string };
      password: { value: string };
    };

    if (
      payload.email.value === "example@email.com" &&
      payload.password.value === "password"
    ) {
      dispatch({
        type: AuthenticationActionTypes.SET_LOGGED_EMPLOYEE,
        user: {
          userName: "John Doe",
          userEmail: "example@email.com",
        },
      });
    }
  };

  // TODO : Use context state instead of local state
  const handleLogout = () => {
    dispatch({
      type: AuthenticationActionTypes.LOGOUT_EMPLOYEE,
    });
  };

  const renderLoginForm = () => (
    <form noValidate onSubmit={handleLogin}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Login
      </Button>
    </form>
  );

  const renderLogoutForm = () => (
    <div>
      <Typography variant="h6">Logged in as: {userData.userEmail}</Typography>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Box mt={4}>
          <Typography component="h1" variant="h5">
            {isAuthenticated ? "Welcome!" : "Login"}
          </Typography>
          {isAuthenticated ? renderLogoutForm() : renderLoginForm()}
        </Box>
      </div>
    </Container>
  );
}

export default App;
