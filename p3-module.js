/*
    CIT 281 Project 3
    Name: Edwin Gutierrez
*/

// Determines if "coin" is a valid coin value (i.e. 1, 5, 10, etc.)
const validDenomination = (coin) => [1,5,10,25,50,100].indexOf(coin) !== -1 ? true : false;

// Calculates the value of a coin object and assigns a default of 0 to variables
const valueFromCoinObject = (obj) => {
    const { denom = 0, count = 0 } = obj;
    if (validDenomination(denom) === true) {
        return denom * count;
    }
}

// Iterates through coin objects in array and adds them together
const valueFromArray = (arr) => {
    const arrayOfObjectValues = [];

    // A function to handle nested arrays and their coin objects
    const findingCoinObjects = (arr2) => {
        for (const obj of arr2) {
            // Adds coin objects to empty array
            arrayOfObjectValues.push(valueFromCoinObject(obj));
        } 
    }

    // Runs through the array and determines if there is a nested array
    for (const obj of arr) {
        if (Array.isArray(obj) === true) {
            findingCoinObjects(obj);
        } else {
            // Adds coin objects to empty array
            arrayOfObjectValues.push(valueFromCoinObject(obj));
        }
    }

    // Reduces the final array of coin objects and sums their combined values together
    return arrayOfObjectValues.reduce((accumulator, currentValue) => accumulator + currentValue);
}

// will be the only exported function, will return the value from valueFromArray
const coinCount = (...coinage) => valueFromArray(coinage);

// Test Code Functions:
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins)); // Extra credit

// Exported functions for server use:
module.exports = {
    coinCount,
    coins
};
