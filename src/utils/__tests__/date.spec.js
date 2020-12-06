import moment from 'moment';
import { parsePhrase } from '../date';

it('should parse phrases correctly', () => {
  const phrases = [{
    phrase: 'remind me to feed the cats tomorrow at 6 am',
    parsedPhrase: 'feed the cats',
    date: moment().add(1, 'day').format('L'),
    time: '06:00am',
  }, {
    phrase: 'remind me in two hours to take a break',
    parsedPhrase: 'take a break',
    date: moment().format('L'),
    time: moment().add(2, 'hours').format('hh:mma'),
  }, {
    phrase: 'remind me to do some deep breathing in 10 minutes',
    parsedPhrase: 'do some deep breathing',
    date: moment().format('L'),
    time: moment().add(10, 'minutes').format('hh:mma'),
  }, {
    phrase: 'remind me at 3pm to wash the dishes',
    parsedPhrase: 'wash the dishes',
    date: moment().format('L'),
    time: '03:00pm',
  }, {
    phrase: 'remind me to wash the dishes at 4:00 pm tomorrow',
    parsedPhrase: 'wash the dishes',
    date: moment().add(1, 'day').format('L'),
    time: '04:00pm',
  }, {
    phrase: 'remind me on friday at 9pm to go party',
    parsedPhrase: 'go party',
    date: moment().startOf('week').add(5, 'days').format('L'),
    time: '09:00pm',
  }, {
    phrase: 'remind me to feed the doggies tomorrow at 12',
    parsedPhrase: 'feed the doggies',
    date: moment().add(1, 'day').format('L'),
    time: '12:00pm',
  }];

  phrases.forEach(({ phrase, parsedPhrase, date, time }) => {
    const { name, startDate, startTime } = parsePhrase(phrase.replace(/remind/i, ''));

    expect(name).toBe(parsedPhrase);
    expect(startDate).toBe(date);
    expect(startTime).toBe(time);
  });
});
