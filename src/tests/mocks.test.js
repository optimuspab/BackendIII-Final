import assert from 'assert';
import request from 'supertest';
import app from '../app.js';

(async () => {
  console.log('Running mocking tests...');

  try {
 
    const response1 = await request(app).get('/api/mocks/mockingpets');
    assert.strictEqual(response1.status, 200, 'GET /mockingpets should return status 200');
    assert.strictEqual(response1.body.payload.length, 100, 'Default response should return 100 pets');
    console.log('✓ Test 1 passed: GET /mockingpets');

    const response2 = await request(app).get('/api/mocks/mockingusers');
    assert.strictEqual(response2.status, 200, 'GET /mockingusers should return status 200');
    assert.strictEqual(response2.body.payload.length, 50, 'Default response should return 50 users');
    console.log('✓ Test 2 passed: GET /mockingusers');

    const payload = { users: 10, pets: 15 };
    const response3 = await request(app).post('/api/mocks/generateData').send(payload);
    assert.strictEqual(response3.status, 200, 'POST /generateData should return status 200');
    assert.strictEqual(response3.body.message, 'Datos generados correctamente');
    console.log('✓ Test 3 passed: POST /generateData');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }

  console.log('All mocking tests passed!');
  process.exit(0);
})();
