import chrono from 'chrono-node';
import moment from 'moment';

const DATE_PHRASE_SPECIAL_WORDS = ['me', 'to', 'on'];

const clearPhrase = (phrase) => {
  const wordsToRemove = [...DATE_PHRASE_SPECIAL_WORDS];

  return phrase.split(' ').reduce((words, word) => {
    if (wordsToRemove.includes(word)) {
      wordsToRemove.splice(wordsToRemove.indexOf(word), 1);

      return `${words}`;
    }

    return `${words} ${word}`.trim();
  }, '');
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// eslint-disable-next-line import/prefer-default-export
export const parsePhrase = (phrase) => {
  const [parsedPhrase] = chrono.parse(phrase);

  if (!parsedPhrase) {
    return null;
  }

  const eventName = phrase.replace(parsedPhrase.text, '');

  const startDate = parsedPhrase.start && moment(parsedPhrase.start.date()).format('DD/MM/YYYY-HH:mm').split('-');
  startDate[1] = formatAMPM(parsedPhrase.start.date()).toUpperCase();
  const endDate = parsedPhrase.end && moment(parsedPhrase.end.date()).format('DD/MM/YYYY-HH:mm').split('-');

  return {
    name: clearPhrase(eventName),
    startDate: startDate && startDate[0],
    startTime: startDate && startDate[1],
    startDateTime: startDate[0] + " " + startDate[1],
    endDate: endDate && endDate[0],
    endTime: endDate && endDate[1],
  };
};
