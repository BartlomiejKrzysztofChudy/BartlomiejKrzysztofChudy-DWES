const obj = { a: 1, b: 2, c: 3, d: 4 };

const { a, ...rest } = obj;

console.log(a);        
console.log(rest); 
