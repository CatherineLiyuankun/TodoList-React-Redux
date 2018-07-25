const request = require('request');

describe('cal', () => {
    it('should multiplu 2 and 2', () => {
        expect(2*2).toBe(4);
    });
});

describe('get todoItems', () => {
    it('should return 200 OK', (done) => {
        request.get('http://localhost:8787/todoitems', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('should return a list greater than 0', (done) => {
        request.get('http://localhost:8787/todoitems', (err, res) => {
            expect(res.body.length).toBeGreaterThan(0);
            done();
        });
    });
});

describe('get todoItems by status', () => {
    it('should return 200 OK', (done) => {
        request.get('http://localhost:8787/todoitems/active', (err, res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });
    it('marked should be same', (done) => {
        request.get('http://localhost:8787/todoitems/active', (err, res) => {
            expect(JSON.parse(res.body)[0].marked).toEqual(false);
            done();
        });
    });
});
