import UserRepository from './UserRepository'

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
  hydrationRepo = data[1].hydrationData
  sleepRepo = data[2].sleepData
  activityRepo = data[3].activityData
}

setTimeout(function(){ console.log(userRepo, hydrationRepo, sleepRepo, activityRepo); }, 2000);
