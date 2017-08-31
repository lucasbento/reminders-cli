let prompts = [];

export default {
  prompt: (questions) => {
    prompts = [
      ...prompts,
      ...questions,
    ];

    let answers = {};
    questions.forEach((question) => {
      if (question.type === 'list') {
        const lastChoice = question.choices[question.choices.length - 1];

        answers = {
          ...answers,
          [question.name]: lastChoice,
        };
      }

      if (question.type === 'input') {
        // TODO: make it work for questions without `default`
        console.log('question', question.default);
        if (question.default) {
          answers = {
            ...answers,
            [question.name]: question.default,
          };
        }
      }
    });

    return answers;
  },
  getPrompts: () => prompts,
};
