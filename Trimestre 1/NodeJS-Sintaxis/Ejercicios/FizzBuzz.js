const numero = 100;

const fizz = "Fizz";
const buzz = "Buzz";
const fizzBuzz = "FizzBuzz";

for (let i = 1; i <= numero; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log(fizzBuzz);

  } else if (i % 3 === 0) {
    console.log(fizz);

  } else if (i % 5 === 0) {
    console.log(buzz);
    
  } else {
    console.log(i);
  }
}
