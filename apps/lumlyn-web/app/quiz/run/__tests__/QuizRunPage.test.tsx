// quiz/run/__tests__/QuizRunPage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import QuizRunPage from '../page';
import { quizQuestions, midCheck } from '../../messages/quiz-options';

// 1) definește mockRouter înainte de jest.mock
const mockRouter = {
  replace: jest.fn(),
  push: jest.fn(),
  back: jest.fn(),
};

// 2) mock Next.js navigation
jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  return {
    ...actual,
    useRouter: () => mockRouter,
    useSearchParams: () => ({ get: (_: string) => null }),
  };
});

describe('QuizRunPage component', () => {
  beforeEach(() => {
    // window.posthog mock pentru evenimente
    (global as any).window = Object.assign(global.window || {}, {
      posthog: {
        capture: jest.fn(),
      },
    });
    jest.clearAllMocks();
  });

  test('progresses through questions and midcheck to completion (no intro screen)', async () => {
    const { container } = render(<QuizRunPage />);

    // suntem direct în Q1 (fără intro)
    await screen.findByText('Q1 of 6');

    // a11y sanity
    const results = await axe(container);

    // a pornit trackingul de start
    expect((window as any).posthog.capture).toHaveBeenCalledWith('quiz_start');

    // Q1 -> prima opțiune
    const q1First = screen.getByRole('radio', {
      name: quizQuestions[0].options[0].label,
    });
    await userEvent.click(q1First);
    await screen.findByText('Q2 of 6');

    // Q2 -> Q2_O1 -> midcheck
    const q2First = screen.getByRole('radio', {
      name: quizQuestions[1].options[0].label,
    });
    await userEvent.click(q2First);

    // apare midcheck
    await screen.findByText(midCheck.heading);

    // Continue din midcheck
    const continueBtn = screen.getByRole('button', { name: midCheck.cta });
    await userEvent.click(continueBtn);

    // Q3
    await screen.findByText('Q3 of 6');

    // finalizează Q3–Q6
    for (let i = 2; i < quizQuestions.length; i++) {
      const question = quizQuestions[i];
      const option = await screen.findByRole('radio', {
        name: question.options[0].label,
      });
      await userEvent.click(option);
    }

    // redirect la /quiz/outro
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/quiz/outro');
    });

    // evenimentul de complete
    expect((window as any).posthog.capture).toHaveBeenCalledWith('quiz_complete');
  });
});
