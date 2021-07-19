import { expect } from 'chai';
import Activity from '../src/Activity';
import ActivityRepository from '../src/ActivityRepository';
import UserRepository from '../src/UserRepository';

describe('ActivityRepository', () => {
  let activityRepo, data, userData, userRepo

  beforeEach(() => {
    data = [
        {"userID": 1, "date": '2019/06/15', "numSteps": 3700, "minutesActive": 10, 'flightsOfStairs': 20},
        {"userID": 1, "date": '2019/06/16', "numSteps": 4294, "minutesActive": 41, 'flightsOfStairs': 14},
        {"userID": 1, "date": '2019/06/17', "numSteps": 7402, "minutesActive": 20, 'flightsOfStairs': 42},
        {"userID": 1, "date": '2019/06/18', "numSteps": 10000, "minutesActive": 10, 'flightsOfStairs': 31},
        {"userID": 1, "date": '2019/06/19', "numSteps": 11374, "minutesActive": 97, 'flightsOfStairs': 63},
        {"userID": 1, "date": '2019/06/20', "numSteps": 2643, "minutesActive": 21, 'flightsOfStairs': 23},
        {"userID": 1, "date": '2019/06/21', "numSteps": 6389, "minutesActive": 40, 'flightsOfStairs': 43},
        {"userID": 1, "date": '2019/06/22', "numSteps": 11652, "minutesActive": 76, 'flightsOfStairs': 31},
        {"userID": 2, "date": '2019/06/15', "numSteps": 4230, "minutesActive": 82, 'flightsOfStairs': 12},
        {"userID": 2, "date": '2019/06/16', "numSteps": 9842, "minutesActive": 50, 'flightsOfStairs': 31},
        {"userID": 2, "date": '2019/06/17', "numSteps": 5023, "minutesActive": 40, 'flightsOfStairs': 41}
      ]
      const userData = [{
        "id": 1,
        "name": "Luisa Hane",
        "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        "email": "Diana.Hayes1@hotmail.com",
        "strideLength": 4.3,
        "dailyStepGoal": 10000,
        "friends": [16, 4, 8]
      }, {
        "id": 2,
        "name": "Jarvis Considine",
        "address": "30086 Kathryn Port, Ciceroland NE 07273",
        "email": "Dimitri.Bechtelar11@gmail.com",
        "strideLength": 4.5,
        "dailyStepGoal": 5000,
        "friends": [9, 18, 24, 19]
      }]

      activityRepo = new ActivityRepository(data)
      userRepo = new UserRepository(userData)
    })

    it('should be a function', () => {
      expect(ActivityRepository).to.be.a('function')
    })

    it('should hold instances of the Activity class', () => {
      expect(activityRepo.activity[0]).to.be.an.instanceof(Activity)
    })

    it('should by able to filter by user ID', () => {
      expect(activityRepo.filterByUser(2).length).to.equal(3)
      expect(activityRepo.filterByUser(2)[2].numSteps).to.equal(5023)
    })

    it('should return averages for a specific date', () => {
      expect(activityRepo.getUserAvg(2, 'numSteps')).to.equal(6365)
      expect(activityRepo.getUserAvg(2, 'minutesActive')).to.equal(57)
      expect(activityRepo.getUserAvg(2, 'flightsOfStairs')).to.equal(28)
    })

    it('should return minutesActive or numSteps for a specific day', () => {
      expect(activityRepo.findUserActivityData(1, '2019/06/19', 'minutesActive')).to.equal(97)
      expect(activityRepo.findUserActivityData(2, '2019/06/17', 'numSteps')).to.equal(5023)
    })

    it('should find a users step goal and strideLength', () => {
      activityRepo.updateCurrentUser(1, userRepo);
      expect(activityRepo.currentUser.dailyStepGoal).to.equal(10000)
      activityRepo.updateCurrentUser(2, userRepo);
      expect(activityRepo.currentUser.strideLength).to.equal(4.5)
    })

    it('should return a users alltime stair climbing record', () => {
      expect(activityRepo.getPersonalBest(2, 'flightsOfStairs')).to.equal(41)
    })

    it('should check if the user reached stepGoal for a date', () => {
      activityRepo.updateCurrentUser(2, userRepo)
      expect(activityRepo.checkGoalReached('2019/06/16')).to.equal(true)
    })

    it('should return all days that user reached thier goal', () => {
      activityRepo.updateCurrentUser(1, userRepo)
      expect(activityRepo.getSuccessfulDays().length).to.equal(3)
    })

    it('should return a minutesActive avg for a given week', () => {
      activityRepo.updateCurrentUser(1, userRepo)
      expect(activityRepo.getWeeklyAverage('2019/06/21')).to.equal(34)
    })

    it('should return amount of miles traveled for a specific date', () => {
      activityRepo.updateCurrentUser(2, userRepo)
      expect(activityRepo.calculateMilesTraveled('2019/06/16')).to.equal(8.4)
    })
})
