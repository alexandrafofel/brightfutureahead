import { quizQuestions, QUIZ_LENGTH } from '../../messages/quiz-options';
import { quizReducer, createInitialState } from '../quizReducer';

describe('quizReducer', () => {
  test('START -> intră direct în prima întrebare (index 0)', () => {
    let state = createInitialState();
    state = quizReducer(state, { type: 'START' });
    expect(state.step).toBe('question');
    expect((state as any).index).toBe(0);
  });

  test('Q2_O1 (0–2 years) declanșează midcheck', () => {
    let state = quizReducer(createInitialState(), { type: 'START' });

    // răspundem la Q1 cu prima opțiune
    const q1 = quizQuestions[0];
    state = quizReducer(state, { type: 'ANSWER', qid: q1.id, oid: q1.options[0].id });
    expect(state.step).toBe('question');
    expect((state as any).index).toBe(1); // Q2

    // la Q2 alegem opțiunea 1 (Q2_O1) -> midcheck
    const q2 = quizQuestions[1];
    expect(q2.id).toBe('Q2');
    const o1 = q2.options[0].id; // ar trebui să fie "Q2_O1"
    state = quizReducer(state, { type: 'ANSWER', qid: q2.id, oid: o1 });
    expect(state.step).toBe('midcheck');
  });

  test('Q2 orice altă opțiune ≠ Q2_O1 NU declanșează midcheck', () => {
    let state = quizReducer(createInitialState(), { type: 'START' });

    // Q1
    const q1 = quizQuestions[0];
    state = quizReducer(state, { type: 'ANSWER', qid: q1.id, oid: q1.options[0].id });
    expect((state as any).index).toBe(1); // Q2

    // Q2 -> alegem opțiunea a 2-a (dacă există)
    const q2 = quizQuestions[1];
    const alt = q2.options[1]?.id ?? q2.options[q2.options.length - 1].id;
    state = quizReducer(state, { type: 'ANSWER', qid: q2.id, oid: alt });

    // trebuie să fim în continuare pe flow-ul de întrebări, la Q3
    expect(state.step).toBe('question');
    expect((state as any).index).toBe(2);
  });

  test('parcurgere până la final -> step=complete', () => {
    let state = quizReducer(createInitialState(), { type: 'START' });

    // Q1
    state = quizReducer(state, { type: 'ANSWER', qid: quizQuestions[0].id, oid: quizQuestions[0].options[0].id });
    // Q2 -> alegem o opțiune ≠ Q2_O1 ca să sari direct la Q3
    const q2Alt = quizQuestions[1].options[1]?.id ?? quizQuestions[1].options.slice(-1)[0].id;
    state = quizReducer(state, { type: 'ANSWER', qid: quizQuestions[1].id, oid: q2Alt });

    // Restul întrebărilor până la Q6
    for (let i = 2; i < QUIZ_LENGTH; i++) {
      state = quizReducer(state, { type: 'ANSWER', qid: quizQuestions[i].id, oid: quizQuestions[i].options[0].id });
    }

    expect(state.step).toBe('complete');
  });

  test('midcheck -> CONTINUE te duce la Q3', () => {
    let state = quizReducer(createInitialState(), { type: 'START' });
    // Q1
    state = quizReducer(state, { type: 'ANSWER', qid: quizQuestions[0].id, oid: quizQuestions[0].options[0].id });
    // Q2_O1 -> midcheck
    state = quizReducer(state, { type: 'ANSWER', qid: quizQuestions[1].id, oid: quizQuestions[1].options[0].id });
    expect(state.step).toBe('midcheck');

    // CONTINUE -> Q3
    state = quizReducer(state, { type: 'CONTINUE' });
    expect(state.step).toBe('question');
    expect((state as any).index).toBe(2);
  });
});
