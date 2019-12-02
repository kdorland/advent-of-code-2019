const fs = require('fs');
const lines = fs.readFileSync("input").toString('utf-8');
const array = lines.split('\n').map(e => e.trim());

const result = array.map(n => Math.floor(n / 3) - 2).reduce((prev, curr) => prev + curr, 0);
console.log("Fuel required (part 1):", result);

let totalFuel = 0;
for (let mass of array) {
    let totalComponentFuel = 0;
    let fuel = Math.floor(mass / 3) - 2;
    while (fuel > 0) {
        totalComponentFuel += fuel;
        fuel = Math.floor((fuel) / 3) - 2;
    }
    totalFuel += totalComponentFuel;
}
console.log("Total fuel (part 2)", totalFuel);