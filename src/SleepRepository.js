import Sleep from '../src/Sleep'

class SleepRepository{
  constructor(data) {
    this.sleep = data.map(data => new Sleep(data))
  }

  getAvgQuality() {
    const average = this.sleep.reduce((currentTotal, sleep) => {
      return sleep.sleepQuality + currentTotal
    }, 0) / this.sleep.length
    return Math.round(average * 10)/10
  }

  filterByUser(userID) {
    return this.sleep.filter(data => data.userID === userID )
  }

  getUserAvg(userID, key) {
    const userSleep = this.filterByUser(userID)
    const average = userSleep.reduce((currentTotal, sleep) => {
      return sleep[`${key}`] + currentTotal
    }, 0) / userSleep.length
    return Math.round(average * 10)/10
  }

  findUserSleepData(userID, date, key) {
    const userSleep = this.filterByUser(userID)
    return userSleep.find(sleep => sleep.date === date)[`${key}`]
  }

  getDataByWeek(userID, date, key) {
    const userSleep = this.filterByUser(userID)
    const reversedDates = userSleep.reverse()
    const dateIndex = userSleep.findIndex(sleep => sleep.date === date)
    const days = reversedDates.slice(dateIndex, dateIndex + 7)
    return days.map(day => day[`${key}`])
   }
}

export default SleepRepository;
