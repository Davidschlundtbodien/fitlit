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
  //Selects a random user
  let randomUserID = Math.floor(Math.random() * 50 + 1)
  activityRepo.updateCurrentUser(randomUserID, userRepo)
  updateUserCard()
}
//Sanity Check for response
setTimeout(function(){ console.log(userRepo, hydrationRepo, sleepRepo, activityRepo); }, 2000);


const userGreeting = document.getElementById('helloUser')
const userInfo = document.getElementById('userInfo')

const updateUserCard = () => {
  let user = activityRepo.currentUser
  userGreeting.innerText = `Hello, ${user.firstName()}!`
  userInfo.innerText = `📥 ${user.email}   🏡${user.address}`
}
