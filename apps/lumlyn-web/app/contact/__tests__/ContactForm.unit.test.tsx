import { render, screen, fireEvent } from "@testing-library/react";
// Use a relative import instead of the `@` alias to avoid the need for
// moduleNameMapper configuration in Jest.  The path climbs three levels
// out of the test folder to reach the components directory.
import ContactForm from "../../../components/contact/ContactForm";


// Mock the server action and analytics to avoid network calls during tests.
jest.mock("../actions", () => ({
  submitContact: jest.fn(),
}));
jest.mock("posthog-js", () => ({
  capture: jest.fn(),
}));

describe("ContactForm unit tests", () => {
  test("renders all fields and labels", () => {
    render(<ContactForm />);
    // The visually hidden labels are still accessible to getByLabelText.
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    // Checkbox label uses visible text
    expect(screen.getByLabelText(/I agree that my details/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send with care/i })).toBeInTheDocument();
  });

  test("shows validation messages on invalid submission", async () => {
    render(<ContactForm />);
    // fill in invalid values
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "not-an-email" } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "short" } });
    // leave checkbox unchecked
    fireEvent.click(screen.getByRole("button", { name: /send with care/i }));
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 10 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please agree to the consent/i)).toBeInTheDocument();
  });
});
