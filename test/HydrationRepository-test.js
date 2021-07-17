import { expect } from 'chai';
import Hydration from '../src/Hydration';
import HydrationRepository from '../src/HydrationRepository';


describe('HydrationRepository', () => {
  let data, hydrationRepo

  beforeEach(() => {
    data = [
      {"userID": 1, "date": "2019/06/15", "numOunces": 37},
      {"userID": 1, "date": "2019/06/16", "numOunces": 75},
      {"userID": 1, "date": "2019/06/17", "numOunces": 47},
      {"userID": 1, "date": "2019/06/18", "numOunces": 85},
      {"userID": 1, "date": "2019/06/19", "numOunces": 42},
      {"userID": 1, "date": "2019/06/20", "numOunces": 87},
      {"userID": 1, "date": "2019/06/21", "numOunces": 94},
      {"userID": 1, "date": "2019/06/22", "numOunces": 20},
      {"userID": 2, "date": "2019/06/15", "numOunces": 84},
      {"userID": 2, "date": "2019/06/16", "numOunces": 39},
      {"userID": 2, "date": "2019/06/17", "numOunces": 75}
    ]
    hydrationRepo = new HydrationRepository(data)
  })

  it('should be a function', () => {
    expect(HydrationRepository).to.be.a('function')
  })

  it('should hold instances of the Hydration class', () => {
    expect(hydrationRepo.hydration[0]).to.be.an.instanceof(Hydration)
  })

  it('should by able to filter by user ID', () => {
    expect(hydrationRepo.filterByUser(2).length).to.equal(3)
    expect(hydrationRepo.filterByUser(2)[2].numOunces).to.equal(75)
  })

  it('should calculate average ounces per day of all time for a user', () => {
    expect(hydrationRepo.getTotalAvg(2)).to.equal(66)
  })

  it('should return ounces for a specific day', () => {
    expect(hydrationRepo.findOuncesOfDate(1, '2019/06/19')).to.equal(42)
  })

  it('should return an array of ounces consumed for a week', () => {
    let days = hydrationRepo.getWeekOunces(1, '2019/06/21')
    expect(days[0]).to.equal(94)
    expect(days[6]).to.equal(37)
  })
})
