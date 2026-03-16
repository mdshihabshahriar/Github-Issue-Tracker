### 1️⃣ What is the difference between var, let, and const?

var, let, and const are used to declare variables in JavaScript.

* **var**

  * Function scoped
  * Can be redeclared and updated
  * Not recommended in modern JavaScript

* **let**

  * Block scoped
  * Can be updated but cannot be redeclared

* **const**

  * Block scoped
  * Cannot be updated or redeclared
  * Must be initialized when declared

Example:

```javascript
var name = "John";
let age = 25;
const country = "USA";

age = 26; // allowed
name = "Mike"; // allowed
// country = "UK"; not allowed
```

---

### 2️⃣ What is the spread operator (...)?

The **spread operator** (...) is used to expand elements of an array or object.

It helps to copy or combine arrays and objects easily.

Example:

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];

console.log(newNumbers);
// [1, 2, 3, 4, 5]
```

Object example:

```javascript
const user = { name: "John", age: 25 };

const newUser = {
  ...user,
  country: "USA"
};

console.log(newUser);
```

---

### 3️⃣ What is the difference between map(), filter(), and forEach()?

These are array methods used to work with array elements.

**map()**

* Creates a new array
* Transforms each element

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(n => n * 2);
// [2, 4, 6]
```

**filter()**

* Creates a new array
* Returns elements that match a condition

```javascript
const numbers = [1, 2, 3, 4];

const even = numbers.filter(n => n % 2 === 0);
// [2, 4]
```

**forEach()**

* Loops through an array
* Does not return a new array

```javascript
const numbers = [1, 2, 3];

numbers.forEach(n => {
  console.log(n);
});
```

---

### 4️⃣ What is an arrow function?

An arrow function is a shorter way to write a function in JavaScript.

Example:

Normal function:

```javascript
function add(a, b) {
  return a + b;
}
```

Arrow function:

```javascript
const add = (a, b) => {
  return a + b;
};
```

Short version:

```javascript
const add = (a, b) => a + b;
```

---

### 5️⃣ What are template literals?

Template literals are used to create strings with embedded variables.

They use backticks (` `)** instead of quotes.

Example:

```javascript
const name = "John";
const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Template literals make it easier to write dynamic strings and multi-line text.
