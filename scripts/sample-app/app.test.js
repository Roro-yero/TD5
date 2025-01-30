// app.test.js
const request = require('supertest');
const app = require('./app');

describe('Test the root path', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});

describe('Test the /name/:name path', () => {
  test('It should respond with a personalized greeting', async () => {
    const name = 'Alice';
    const response = await request(app).get(`/name/${name}`);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(`Hello, ${name}!`);
  });
});

// app.test.js
describe('Test the /add/:a/:b path', () => {
    test('It should respond with the sum of two valid numbers', async () => {
      const a = 5;
      const b = 3;
      const response = await request(app).get(`/add/${a}/${b}`);
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(`The sum of ${a} and ${b} is ${a + b}.`);
    });
  
    test('It should return a 400 status code for invalid inputs', async () => {
      const response = await request(app).get('/add/foo/bar');
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Invalid input. Please provide two numbers.');
    });
  });
  