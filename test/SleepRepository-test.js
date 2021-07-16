import { expect } from 'chai';
import Sleep from '../src/Sleep';
import SleepRepository from '../src/SleepRepository';

describe('SleepRepository', () => {
  let data, sleepRepo

  beforeEach(() => {
    data = [
      {"userID": 1, "date": '2019/06/15', "hoursSlept": 8.1, "sleepQuality": 4.2},
      {"userID": 1, "date": '2019/06/16', "hoursSlept": 6.5, "sleepQuality": 3.4},
      {"userID": 1, "date": '2019/06/17', "hoursSlept": 7.3, "sleepQuality": 2.7},
      {"userID": 1, "date": '2019/06/18', "hoursSlept": 5.2, "sleepQuality": 5.0},
      {"userID": 1, "date": '2019/06/19', "hoursSlept": 6.4, "sleepQuality": 3.1},
      {"userID": 1, "date": '2019/06/20', "hoursSlept": 4.5, "sleepQuality": 2.3},
      {"userID": 1, "date": '2019/06/21', "hoursSlept": 4.8, "sleepQuality": 2.5},
      {"userID": 1, "date": '2019/06/22', "hoursSlept": 6.8, "sleepQuality": 3.5},
      {"userID": 2, "date": '2019/06/15', "hoursSlept": 8.6, "sleepQuality": 4.2},
      {"userID": 2, "date": '2019/06/16', "hoursSlept": 7.7, "sleepQuality": 1.8},
      {"userID": 2, "date": '2019/06/17', "hoursSlept": 6.7, "sleepQuality": 4.0}
    ]

    sleepRepo = new SleepRepository(data)
  })

  it('should be a function', () => {
    expect(SleepRepository).to.be.a('function')
  })

  it('should hold instances of the Sleep class', () => {
    expect(sleepRepo.sleep[0]).to.be.an.instanceof(Sleep)
  })

  it('should by able to filter by user ID', () => {
    expect(sleepRepo.filterByUser(2).length).to.equal(3)
    expect(sleepRepo.filterByUser(2)[2].hoursSlept).to.equal(6.7)
  })

  it('should calculate overall avg of hoursSlept and sleepQuality', () => {
    expect(sleepRepo.getUserAvg(2, 'hoursSlept')).to.equal(7.7)
    expect(sleepRepo.getUserAvg(2, 'sleepQuality')).to.equal(3.3)
  })

  it('should return hoursSlept or sleepQuality for a specific day', () => {
    expect(sleepRepo.findUserSleepData(1, '2019/06/19', 'hoursSlept')).to.equal(6.4)
    expect(sleepRepo.findUserSleepData(2, '2019/06/17', 'sleepQuality')).to.equal(4.0)
  })

  it('should return an array of hoursSlept or sleepQuality for a week', () => {
    let days = sleepRepo.getDataByWeek(1, '2019/06/21', 'hoursSlept')
    expect(days[0]).to.equal(4.8)
    days = sleepRepo.getDataByWeek(1, '2019/06/21', 'sleepQuality')
    expect(days[6]).to.equal(4.2)
  })

  it('should get the average sleepQualityof all users', () => {
    expect(sleepRepo.getAvgQuality()).to.equal(3.3)
  })
})
