/// <reference types="cypress" />

function generateUser() {
  const randomNumber = Math.random().toString().slice(2);
  const username = `test_user-${randomNumber}`;
  const email = `${username}@mail.com`;
  const password = 'Test1234';

  return { email, password, username };
}

module.exports = { generateUser };
