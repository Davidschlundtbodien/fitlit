import Hydration from '../src/Hydration';

class HydrationRepository {
  constructor(data) {
    this.hydration = data.map(data => new Hydration(data))
  }

  filterByUser(userID) {
    return this.hydration.filter(data => data.userID === userID )
  }

  getTotalAvg(userID) {
    const userHydration = this.filterByUser(userID)
    const average = userHydration.reduce((currentTotal, hydration) => {
      return hydration.numOunces + currentTotal
    }, 0) / userHydration.length
    return Math.round(average)
  }

  findOuncesOfDate(userID, date) {
    const userHydration = this.filterByUser(userID)
    return userHydration.find(hydration => hydration.date === date).numOunces
  }

  getWeekOunces(userID, date) {
    const userHydration = this.filterByUser(userID)
    const reversedDates = userHydration.reverse()
    const dateIndex = userHydration.findIndex(hydration => hydration.date === date)
    const days = reversedDates.slice(dateIndex, dateIndex + 7)
    return days.map(day => day.numOunces)
   }

}

export default HydrationRepository;
