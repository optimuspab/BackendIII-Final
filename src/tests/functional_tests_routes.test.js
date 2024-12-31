import assert from 'assert';
import request from 'supertest';
import app from '../app.js';

(async () => {
  console.log('Running functional tests for routes...');

  try {
    // Test 1: GET /mockingusers
    const response1 = await request(app).get('/api/mocks/mockingusers');
    assert.strictEqual(response1.status, 200, 'GET /mockingusers should return status 200');  
    assert.strictEqual(response1.body.payload.length, 50, 'Default response should return 50 users');
    console.log('✓ Test 1 passed: GET /mockingusers');

    // Test 2: GET /mockingusers with query
    const response2 = await request(app).get('/api/mocks/mockingusers?quantity=20');
    assert.strictEqual(response2.status, 200, 'GET /mockingusers?quantity=20 should return status 200');
    assert.strictEqual(response2.body.payload.length, 20, 'Should return 20 users');
    console.log('✓ Test 2 passed: GET /mockingusers with query');

    // Test 3: GET /mockingusers with invalid query
    const response3 = await request(app).get('/api/mocks/mockingusers?quantity=-5');
    assert.strictEqual(response3.status, 400, 'GET /mockingusers with invalid quantity should return 400');
    assert.strictEqual(response3.body.message, 'El parámetro quantity debe ser un número positivo.');
    console.log('✓ Test 3 passed: GET /mockingusers with invalid query');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }

  console.log('All functional tests for routes passed!');
  process.exit(0);
})();
