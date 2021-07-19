import { expect } from 'chai';
import Activity from '../src/Activity';


describe('Activity', () => {
  let activityData, activity

  beforeEach(() => {
    activityData = {
    "userID": 2,
    "date": '2019/06/15',
    "numSteps": 4294,
    "minutesActive": 138,
    "flightsOfStairs": 10
    }

    activity = new Activity(activityData)
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(activity).to.be.an.instanceof(Activity)
    expect(activity.userID).to.equal(2)
    expect(activity.date).to.equal('2019/06/15')
    expect(activity.numSteps).to.equal(4294)
    expect(activity.minutesActive).to.equal(138)
    expect(activity.flightsOfStairs).to.equal(10)
  })
})
