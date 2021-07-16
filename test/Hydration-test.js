import { expect } from 'chai';
import Hydration from '../src/Hydration';

describe('Hydration', () => {
  let hydrationData, hydration

  beforeEach(() => {
    hydrationData =   {
    "userID": 2,
    "date": '2019/06/15',
    "numOunces": 75
    }

    hydration = new Hydration(hydrationData)
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', () => {
    expect(hydration).to.be.an.instanceof(Hydration)
    expect(hydration.userID).to.equal(2)
    expect(hydration.date).to.equal('2019/06/15')
    expect(hydration.numOunces).to.equal(75)
  })
});
