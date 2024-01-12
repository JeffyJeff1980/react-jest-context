/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { AuthenticationProvider } from "./context/AuthenticationProvider";

describe("App", () => {
  const SampleApp = () => {
    return (
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    );
  };
  it("renders the login form", () => {
    render(<SampleApp />);

    // obtain the email address textbox
    const emailTextBox = screen.getByLabelText(/Email Address/i);

    // obtain the password textbox
    const passwordTextBox = screen.getByLabelText(/Password/i);

    // obtain the login button
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // verify that the login form is rendered
    expect(emailTextBox).toBeInTheDocument();
    expect(passwordTextBox).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("renders the logout button", async () => {
    render(<SampleApp />);

    // obtain the email address textbox
    const emailTextBox = screen.getByLabelText(/Email Address/i);

    // obtain the password textbox
    const passwordTextBox = screen.getByLabelText(/Password/i);

    // obtain the login button
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // enter the email address
    userEvent.type(emailTextBox, "example@email.com");

    // enter the password
    userEvent.type(passwordTextBox, "password");

    act(() => {
      // click the login button
      userEvent.click(loginButton);
    });

    // obtain the logout button
    const logoutButton = await screen.findByRole("button", {
      name: /Logout/i,
    });

    expect(await screen.findByText(/example@email.com/i)).toBeInTheDocument();

    // verify that the logout button is rendered
    expect(logoutButton).toBeInTheDocument();
  });
  it("should logout the user", async () => {
    render(<SampleApp />);

    // obtain the email address textbox
    const emailTextBox = screen.getByLabelText(/Email Address/i);

    // obtain the password textbox
    const passwordTextBox = screen.getByLabelText(/Password/i);

    // obtain the login button
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // enter the email address
    userEvent.type(emailTextBox, "example@email.com");

    // enter the password
    userEvent.type(passwordTextBox, "password");

    act(() => {
      // click the login button
      userEvent.click(loginButton);
    });

    // check also that the email is displayed

    expect(await screen.findByText(/example@email.com/i)).toBeInTheDocument();

    // obtain the logout button
    const logoutButton = screen.getByRole("button", { name: /Logout/i });

    act(() => {
      // click the logout button
      userEvent.click(logoutButton);
    });

    // obtain the login button

    const loginButtonAfterLogout = screen.getByRole("button", {
      name: /Login/i,
    });

    // verify that the login button is rendered

    expect(loginButtonAfterLogout).toBeInTheDocument();
  });
});
