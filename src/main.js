import UserRepository from './UserRepository'
import HydrationRepository from './HydrationRepository'
import SleepRepository from './SleepRepository'
import ActivityRepository from './ActivityRepository'

let userRepo, hydrationRepo, sleepRepo, activityRepo

let fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(res => {
      return res.ok ? res.json() : console.log(`ERROR with ${dataType} path`)
    })
    .then(data => data)
}

Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep'), fetchData('activity')]).then((data) => {
  updateData(data)
})

let updateData = (data) => {
  userRepo = new UserRepository(data[0].userData)
  hydrationRepo = new HydrationRepository(data[1].hydrationData)
  sleepRepo = new SleepRepository(data[2].sleepData)
  activityRepo = new ActivityRepository(data[3].activityData)
}
//Sanity Check for response
setTimeout(function(){ console.log(userRepo, hydrationRepo, sleepRepo, activityRepo); }, 2000);
