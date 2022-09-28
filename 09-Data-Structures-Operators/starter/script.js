"use strict";

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// // Data needed for first part of the section
// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const hours = {
//   [weekdays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekdays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],
//   hours,
// };

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//
//for (const [goal, player] of game.scored.entries())
//  console.log(`Goal ${goal + 1} by player ${player}`);
//
//let average = 0;
//const data = Object.values(game.odds);
//
//for (const ave of data) average += ave;
//average /= data.length;
//console.log(average);
//
//for (const [team, odd] of Object.entries(game.odds)) {
//  console.log(team, odd);
//}

// Odd of victory Bayern Munich: 1.3
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Italy");
rest.set(2, "Portugal");
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "We are closed");

const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));
console.log(rest.has("categories"));
rest.delete(2);
//rest.clear();
const arr = [1, 2];
rest.set(arr, "Test");
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr));

const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "c"],
  [2, "java"],
  [3, "javascript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again"],
]);
console.log(question);
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}
//const answer = Number(prompt("What is your answear?"));
//console.log(question.get(answer === question.get("correct")));

console.log([...question]);
