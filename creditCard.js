// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

/* validateCred() return true when an array contains digits 
of a valid credit card number and false when it is invalid */
let sum;
const validateCred = (arr) => {
  let checkSum = [];
  let len = arr.length;
  // console.log(len)
  if (len % 2 === 0) {
    for (i = 0; i < len; i++) {
      if (i % 2 === 0) {
        if (arr[i] * 2 > 9) {
          checkSum.push(arr[i] * 2 - 9);
        } else if (arr[i] * 2 < 9) {
          checkSum.push(arr[i] * 2);
        }
      }
      if (i % 2 === 1) {
        checkSum.push(arr[i]);
      }
    }
  }
  if (len % 2 === 1) {
    for (i = 0; i < len; i++) {
      if (i % 2 === 1) {
        if (arr[i] * 2 > 9) {
          checkSum.push(arr[i] * 2 - 9);
        } else if (arr[i] * 2 < 9) {
          checkSum.push(arr[i] * 2);
        }
      }
      if (i % 2 === 0) {
        checkSum.push(arr[i]);
      }
    }
  }
  // console.log(checkSum)
  sum = checkSum.reduce((a, b) => a + b, 0);
  // console.log(sum)
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
};

/* findInvalidCards returns an array of invalid cards */
let invalidCards = [];
const findInvalidCards = nestedArr => {
  for (const card of nestedArr) {
    if (validateCred(card) === false) {
      invalidCards.push(card);
    }
  }
  return invalidCards;
}

findInvalidCards(batch);

// console.log(invalidCards)

/* idInvalidCardCompanies returns an array of companies 
that have possibly issued invalid cards*/
const idInvalidCardCompanies = nestedInvalidArr => {
  let company = [];
  switch (true) {
    default:
    console.log('Company not found')
    break;

    case (nestedInvalidArr.some(x => x[0]===3)):
    company.push('Amex (American Express)');

    case (nestedInvalidArr.some(x => x[0]===4)):
    company.push('Visa');

    case (nestedInvalidArr.some(x => x[0]===5)):
    company.push('Mastercard');

    case (nestedInvalidArr.some(x => x[0]===6)):
    company.push('Discover');

  }
  return company;
}

console.log(idInvalidCardCompanies(invalidCards))


// Convert a numString to an array of number
const stringToNum = numString => numString.split('').map(Number);

// Convert Invalid Card Number to Valid Card Number

const convertIntoValid = (arr) => {
  let checkForModulo = 0;
  let lastElement = arr[arr.length - 1];
  let newArray = arr.slice(0, -1);

  newArray.reverse();

  for (i = 0; i < arr.length; i += 2) {
    newArray[i] *= 2;
    if (newArray[i] > 9) {
      newArray[i] -= 9;
    }
    checkForModulo += newArray[i];
  }

  for (j = 1; j < newArray.length; j += 2) {
    checkForModulo += newArray[j];
  }
  //console.log(checkForModulo)
  //console.log(newArray)

  let moduloNum = checkForModulo % 10;
  //console.log(moduloNum);
  let newLastDigit = 0;

  if (moduloNum > 0) {
    newLastDigit = +(10 - moduloNum);
  //console.log(newLastDigit);
  }
  let newValidCard = arr;
  newValidCard.splice(-1, 1, newLastDigit);

  return newValidCard;
};

//Example

console.log('Old Invalid Card:\n' + invalid2.join(""))
console.log('New Valid Card:\n'+ convertIntoValid(invalid2).join(""));
