import { TestService } from './test.service';

describe('testService', () => {
  it('should add 2 numbers', () => {
    const service = new TestService();
    expect(service.add(2, 2)).toBe(4);
  });
  it('should sub 2 numbers', () => {
    const service = new TestService();
    expect(service.substract(2, 2)).toBe(0);
  });
});
