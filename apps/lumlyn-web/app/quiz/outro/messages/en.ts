export type ResultKey = "baby" | "v1" | "v2" | "v3" | "v4";

export const RESULT_CONTENT: Record<
  ResultKey,
  { message: string; cta: string; href: string }
> = {
  baby: {
    message:
      "For little ones: a gentle 2-minute ritual, validated for babies.",
    cta: "See the ritual",
    href: "/quiz/tips",
  },
  v1: {
    message:
      "It’s okay. You’ve taken an important step. In under a minute, you’ll get a gentle tip, validated by experts.",
    cta: "Show me the gentle step",
    // 👉 următoarea verigă din lanț
    href: "/quiz/outro?variant=v2",
  },
  v2: {
    message:
      "No more uncertainty. You now receive clear, validated steps to move forward with confidence.",
    cta: "Open the steps",
    // 👉 următoarea verigă din lanț
    href: "/quiz/outro?variant=v3",
  },
  v3: {
    message:
      "You’re just one step away. Your result: a personalized tip that brings more calm.",
    cta: "See the recommendation",
    // 👉 următoarea verigă din lanț
    href: "/quiz/outro?variant=v4",
  },
  v4: {
    message:
      "Yes, what you’re experiencing is normal. Here’s a short solution that brings you more clarity.",
    cta: "I want the solution",
    // 👉 finalul lanțului
    href: "/quiz/tips",
  },
};

// export default pt. interop ESM/CJS
export default RESULT_CONTENT;
