import { render, screen } from "@testing-library/react"
import TextInput from "./TextInput"
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event"

test("textInput Component test", async () => {
  userEvent.setup();
  render(<TextInput />)

  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument()
});

test("TextInput Event test", async () => {
  userEvent.setup();
  render(<TextInput />)

  const inputElement = screen.getByRole("textbox");
  await userEvent.type(inputElement, "Hello World");
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
