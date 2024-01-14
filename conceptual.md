# Conceptual Exercise #
### Answer the following questions below:

#### 1. What are some ways of managing asynchronous code in JavaScript?
  Async/wait and then/catch.

#### 2. What is a Promise?
  An object that will give you a value in the future.

#### 3. What are the differences between an async function and a regular function?
  Async functions always return a promise, while regular functions do not.

#### 4. What is the difference between Node.js and Express.js?
  Node.js is for server-side code, and Express.js is a framework built on top of Node.js.

#### 5. What is the error-first callback pattern?
  A function that returns either successful data or an error object.

#### 6. What is middleware?
  Software that sits inbetween the operating system and applications to allow them to communicate with each other.

#### 7. What does the `next` function do?
  Executes the next middleware.

#### 8. What are some issues with the following code? (consider all aspects: performance, structure, naming, etc) ##

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
  It is fetching user data one by one, which would take longer than if you made each one a promise. Something like this:

```js
async function getUsers() {
  const [elie, joel, matt] = await Promise.all([...
```
  There is also no error handling, so a try/catch would be useful as well. As for the names, if these are users, maybe a naming convention like 'userElie' would be more helpful in the long run. 

