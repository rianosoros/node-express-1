### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
# Async/wait and then/catch.

- What is a Promise?
# An object that will give you a value in the future.

- What are the differences between an async function and a regular function?
# Async functions always return a promise, while regular functions do not.

- What is the difference between Node.js and Express.js?
# Node.js is for server-side code, and Express.js is a framework built on top of Node.js.

- What is the error-first callback pattern?
# A function that returns either successful data or an error object.

- What is middleware?
# Software that sits inbetween the operating system and applications to allow them to communicate with each other.

- What does the `next` function do?
# Executes the next middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
# It is fetching user data one by one, which would take longer than if you made each one a promise. Something like this:

```js
async function getUsers() {
  const [elie, joel, matt] = await Promise.all([...
```
# could fix this issue. There is also no error handling, so a try/catch would be useful as well. As for the names, if these are users, maybe a naming convention like 'userElie' would be more helpful in the long run. 

