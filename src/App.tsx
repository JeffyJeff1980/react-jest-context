import React, { useState } from "react";
import { Button, Container, CssBaseline, TextField, Typography, Grid, Box } from "@mui/material";
import { useAuthenticationStateContext } from "./context/AuthenticationProvider";

function App() {
  // TODO : Use context state instead of local state
  // const { authState } = useAuthenticationStateContext();
  // const { authDispatch } = useAuthenticationStateContext();

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO : Use context state instead of local state
  const handleLogin = () => {
    if (email === "example@email.com" && password === "password") {
      setLoggedIn(true);
    }
  };

  // TODO : Use context state instead of local state
  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  const renderLoginForm = () => (
    <form noValidate>
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        aria-label="password"
        label="Password"
        name="password"
        type="password"
        data-testid="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="button" fullWidth variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </form>
  );

  const renderLogoutForm = () => (
    <div>
      <Typography variant="h6">Logged in as: {email}</Typography>
      <Button type="button" fullWidth variant="contained" color="secondary" onClick={handleLogout}>
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
            {loggedIn ? "Welcome!" : "Login"}
          </Typography>
          {loggedIn ? renderLogoutForm() : renderLoginForm()}
        </Box>
      </div>
    </Container>
  );
}

export default App;
