import { MemoryRouter } from "react-router-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders the login form", () => {
    render(<App />);

    // obtain the email address textbox
    const emailTextBox = screen.getByRole("textbox", { name: /Email Address/i });

    // obtain the password textbox
    const passwordTextBox = screen.getByTestId("password");

    // obtain the login button
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // verify that the login form is rendered
    expect(emailTextBox).toBeInTheDocument();
    expect(passwordTextBox).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("renders the logout button", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // obtain the email address textbox
    const emailTextBox = screen.getByRole("textbox", { name: /Email Address/i });

    // obtain the password textbox
    const passwordTextBox = screen.getByTestId("password");

    // obtain the login button
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // verify that the login form is rendered
    expect(emailTextBox).toBeInTheDocument();
    expect(passwordTextBox).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    // enter the email address
    await userEvent.type(emailTextBox, "example@email.com");
    expect(emailTextBox).toHaveValue("example@email.com");

    // enter the password
    await userEvent.type(passwordTextBox, "password");
    expect(passwordTextBox).toHaveValue("password");

    // click the login button
    await userEvent.click(loginButton);

    // obtain the logout button
    const logoutButton = await screen.findByRole("button", { name: /Logout/i });

    // verify that the logout button is rendered
    expect(logoutButton).toBeInTheDocument();
  });
});
