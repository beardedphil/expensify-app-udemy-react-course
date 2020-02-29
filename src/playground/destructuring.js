// Object Destructuring

const person = {
  name: 'Andrew',
  age: 26,
  location: {
      city: 'Philadelphia',
      temperature: 92,
  },
};

const { name: firstName = 'Anonymous', age } = person;
const { city, temperature: temp } = person.location;

console.log(`${ firstName } is ${ age }.`);

if (city && temp) {
    console.log(`It's ${ temp } in ${ city }`);
}

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    },
    chapters: ['First', 'Second', 'Third']
};

const { name: publisherName = 'Self-published' } = book.publisher;
console.log(publisherName);

const chapters = book.chapters;
console.log(chapters);

// Array destructuring

const address = ['123 Anywhere Street', 'Philadelphia', 'PA', '19147'];
const [, cityName, state = 'New York' ] = address;
console.log(`You are in ${ cityName }, ${ state }.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [ itemName, , mediumPrice ] = item;
console.log(`A medium ${ itemName } costs ${ mediumPrice }.`);
