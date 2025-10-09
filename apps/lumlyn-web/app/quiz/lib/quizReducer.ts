import { quizQuestions, QUIZ_LENGTH } from "../messages/quiz-options";

export type Answers = Record<string, string>;

type Base = { answers: Answers };

export type QuizState =
  | (Base & { step: "intro" })
  | (Base & { step: "question"; index: number })
  | (Base & { step: "midcheck"; atIndex: number })
  | (Base & { step: "complete" });

export type QuizAction =
  | { type: "START" }
  | { type: "ANSWER"; qid: string; oid: string }
  | { type: "BACK" }
  | { type: "CONTINUE" }
  | { type: "RESET" };

export function createInitialState(): QuizState {
  return { step: "intro", answers: {} };
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "START": {
      return { step: "question", index: 0, answers: state.answers };
    }

    case "ANSWER": {
      if (state.step !== "question") return state;
      const { qid, oid } = action;
      const nextAnswers = { ...state.answers, [qid]: oid };

      const isQ2 = state.index === 1 || quizQuestions[state.index]?.id === "Q2";
      if (isQ2 && oid === "Q2_O1") {
        return { step: "midcheck", atIndex: state.index, answers: nextAnswers };
      }

      const isLast = state.index >= QUIZ_LENGTH - 1;
      if (isLast) return { step: "complete", answers: nextAnswers };

      return { step: "question", index: state.index + 1, answers: nextAnswers };
    }

    case "BACK": {
      if (state.step === "midcheck") {
        return { step: "question", index: 1, answers: state.answers };
      }
      if (state.step === "question") {
        if (state.index === 0) {
          return { step: "intro", answers: state.answers };
        }
        return { step: "question", index: state.index - 1, answers: state.answers };
      }
      return state;
    }

    case "CONTINUE": {
      if (state.step === "midcheck") {
        return { step: "question", index: 2, answers: state.answers };
      }
      return state;
    }

    case "RESET":
      return createInitialState();

    default:
      return state;
  }
}
