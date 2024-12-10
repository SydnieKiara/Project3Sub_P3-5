const request = require('supertest');
const fs = require('fs');
const mongoose = require('mongoose');
const app = require('../server');
const Record = require('../models/Record');

describe('POST /', () => {
  it('should return the content from the request body', async () => {
    const response = await request(app)
      .post('/')
      .send({ content: 'test content' });
    
    expect(response.status).toBe(200);
    expect(response.body.content).toBe('test content');
  });

  it('should create a file with the content', async () => {
    const response = await request(app)
      .post('/')
      .send({ content: 'test content' });
    
    expect(fs.existsSync('data.txt')).toBe(true);
    const fileContent = fs.readFileSync('data.txt', 'utf8');
    expect(fileContent).toBe('test content');
  });

  it('should save the record in MongoDB', async () => {
    const record = await Record.findOne({ content: 'test content' });
    expect(record).not.toBeNull();
    expect(record.content).toEqual({ content: 'test content' });
  });
});
