import Activity from '../src/Activity';
import UserRepository from '../src/UserRepository'

class ActivityRepository {
  constructor(data) {
    this.activity = data.map(data => new Activity(data))
  }

  filterByUser(userID) {
    return this.activity.filter(data => data.userID === userID )
  }

  getUserAvg(userID, key) {
    const userActivity = this.filterByUser(userID)
    const average = userActivity.reduce((currentTotal, activity) => {
      return activity[`${key}`] + currentTotal
    }, 0) / userActivity.length
    return Math.round(average)
  }

  findUserActivityData(userID, date, key) {
    const activityData = this.filterByUser(userID)
    return activityData.find(activity => activity.date === date)[`${key}`]
  }

  updateCurrentUser(userID, repo) {
    this.currentUser = repo.findUserByID(userID)
  }

  getPersonalBest(userID, key) {
    const activityData = this.filterByUser(userID)
    const sortedKeyData = activityData.map(data => data[key]).sort((a, b) => b - a)
    return sortedKeyData[0]
  }

  checkGoalReached(date) {
    const stepsForDate = this.findUserActivityData(this.currentUser.id, date, 'numSteps')
    return this.currentUser.dailyStepGoal <= stepsForDate
  }

  getSuccessfulDays() {
    const userActivity = this.filterByUser(this.currentUser.id)
    return userActivity.filter(activity => this.checkGoalReached(activity.date))
  }

  getWeeklyAverage(date) {
    const userActivity = this.filterByUser(this.currentUser.id)
    const reversedDates = userActivity.reverse()
    const dateIndex = reversedDates.findIndex(activity => activity.date === date)
    const days = reversedDates.slice(dateIndex, dateIndex + 7)
    const average = days.reduce((currentTotal, day) => {
      return day.minutesActive + currentTotal
    }, 0) / days.length
    return Math.round(average)
  }

  calculateMilesTraveled(date) {
    const stepsTaken = this.findUserActivityData(this.currentUser.id, date, 'numSteps')
    //The 5280 is the number of feet for 1 mile
    const milesResult = (stepsTaken * this.currentUser.strideLength)/5280
    return Math.round(milesResult * 10)/10
  }
}

export default ActivityRepository;
