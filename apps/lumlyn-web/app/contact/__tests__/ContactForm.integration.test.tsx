import { render, screen, fireEvent, act } from "@testing-library/react";

import ContactForm from "../../../components/contact/ContactForm";
import "@testing-library/jest-dom";

// Mock server action + analytics
jest.mock("../actions", () => ({
  submitContact: jest.fn(),
}));
jest.mock("posthog-js", () => ({
  capture: jest.fn(),
}));

const { submitContact } = require("../actions");

describe("ContactForm integration", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("successful submission displays success toast and auto-hides", async () => {
    // mock success
    submitContact.mockResolvedValueOnce({ ok: true });

    render(<ContactForm />);

    // Fill valid values
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "john@doe.com" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "This is a longer message." } });
    fireEvent.click(screen.getByLabelText(/I agree that my details/i));

    // Submit
    fireEvent.click(screen.getByRole("button", { name: /send with care/i }));

    // ✅ Caută toast-ul prin rol și verifică un substring robust
    const successToast = await screen.findByRole("status");
    expect(successToast).toBeInTheDocument();
    expect(successToast).toHaveTextContent(/thank you/i);

    // Auto-hide ~1600ms
    act(() => {
      jest.advanceTimersByTime(1700);
    });

    // După auto-hide, toast-ul nu mai este prezent
    expect(successToast).not.toBeInTheDocument();
  });

  test("server error displays error toast", async () => {
    // mock error
    submitContact.mockResolvedValueOnce({ ok: false, error: "server_error" });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "jane@doe.com" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "A sufficiently long message." } });
    fireEvent.click(screen.getByLabelText(/I agree that my details/i));

    fireEvent.click(screen.getByRole("button", { name: /send with care/i }));

    // ✅ Verificăm toast de eroare prin rol + substring robust
    const errorToast = await screen.findByRole("status");
    expect(errorToast).toBeInTheDocument();
    expect(errorToast).toHaveTextContent(/something went wrong|try again/i);
  });
});
