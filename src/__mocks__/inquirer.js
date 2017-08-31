import { REMINDER_NAME } from '../../test/helper';

let prompts = [];

const DATE_ANSWER = '11/11/2030';
const TIME_ANSWER = '10:00';

const getAnswer = ({ type, choices, name, default: defaultAnswer }) => {
  if (type === 'list') {
    return choices[choices.length - 1];
  }

  if (defaultAnswer) {
    return defaultAnswer;
  }

  if (name === 'date') {
    return DATE_ANSWER;
  }

  if (name === 'time') {
    return TIME_ANSWER;
  }

  if (name === 'name') {
    return REMINDER_NAME;
  }

  return `${name} value`;
};

export default {
  prompt: (questions) => {
    prompts = [
      ...prompts,
      ...questions,
    ];

    let answers = {};
    questions.forEach((question) => {
      answers = {
        ...answers,
        [question.name]: getAnswer(question),
      };
    });

    return answers;
  },
  getPrompts: () => prompts,
  resetPrompts: () => prompts = [], // eslint-disable-line no-return-assign
};
