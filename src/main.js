import UserRepository from './UserRepository'
import HydrationRepository from './HydrationRepository'
import SleepRepository from './SleepRepository'
import ActivityRepository from './ActivityRepository'
import {mySleepChart, myHydrationChart, myStepsChart, userFriendsChart} from './data/user-charts'

export let userRepo, hydrationRepo, sleepRepo, activityRepo

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
  updateHydrationCard()
  updateSleepCard()
  updateActivityCard()
  updateFriendsList()
  updateWeekSleep()
  updateWeekHydration()
}
//Sanity Check for response
setTimeout(function(){ console.log(userRepo, hydrationRepo, sleepRepo, activityRepo); }, 2000);


const userGreeting = document.getElementById('helloUser')
const userInfo = document.getElementById('userInfo')
const userStepsAvg = document.getElementById('userStepsAvg')
const userQualityAvg = document.getElementById('userQualityAvg')
const friendsList = document.getElementById('friendsList')
const avgStepGoal = document.getElementById('avgStepGoal')
const sleepWeekList = document.getElementById('sleepWeekList')
const hydrationWeekList = document.getElementById('hydrationWeekList')
const activityWeekList = document.getElementById('activityWeekList')

const updateUserCard = () => {
  let user = activityRepo.currentUser
  userGreeting.innerText = `Hello, ${user.firstName()}!`
  userInfo.innerText = `📥 ${user.email}   🏡${user.address}`
}

const updateFriendsList = () => {
  let user = activityRepo.currentUser
  friendsList.innerHTML = "";
  let userFriends =  user.friends.map(friend => userRepo.findUserByID(friend))
  userFriends.forEach(friend => {
    friendsList.innerHTML += `<li><strong>${friend.firstName()}</strong><span>Daily Step Goal: ${friend.dailyStepGoal}</span></li>`
  });
  updateFriendsChart(userFriends)
  avgStepGoal.innerText = `Avg Daily Step Goal: ${userRepo.getStepGoalAvg()}`
}

const updateFriendsChart = (friends) => {
  userFriendsChart.data.labels = friends.map(friend => friend.firstName())
  userFriendsChart.data.datasets[0].data = friends.map(friend => activityRepo.findUserActivityData(friend.id, '2020/01/22', 'numSteps'))
  userFriendsChart.update()
}

const updateHydrationCard = () => {
  let user = activityRepo.currentUser
  let ouncesForWeek = hydrationRepo.getWeekOunces(user.id, '2020/01/22')
  updateDonutChart(myHydrationChart, ouncesForWeek[0], 110)
  userHydrationAvg.innerText = `Avg Consumed Daily: ${hydrationRepo.getTotalAvg(user.id)} oz`
}

const updateSleepCard = () => {
  let user = activityRepo.currentUser
  let sleepForWeek = sleepRepo.getDataByWeek(user.id, '2020/01/22', 'hoursSlept')
  let sleepQualityForWeek = sleepRepo.getDataByWeek(user.id, '2020/01/22', 'sleepQuality')
  updateDonutChart(mySleepChart, sleepForWeek[0], 8)
  userQualityAvg.innerText = `Avg Sleep Quality: ${sleepRepo.getUserAvg(user.id, 'sleepQuality')}`
}

const updateActivityCard = () => {
  let user = activityRepo.currentUser
  let stepsForToday = activityRepo.findUserActivityData(user.id, '2020/01/22', 'numSteps')
  updateDonutChart(myStepsChart, stepsForToday, user.dailyStepGoal)
  userStepsAvg.innerText = `Avg Daily Steps: ${activityRepo.getUserAvg(user.id, 'numSteps')}`
}

const updateDonutChart = (chart, value, total) => {
  chart.data.datasets[0].data[0] = value
  chart.data.datasets[0].data[1] = total - value
  chart.update()
}

const updateWeekSleep = () => {
  let user = activityRepo.currentUser
  let sleepEntries = sleepRepo.getDataByWeek(user.id, '2020/01/22', 'hoursSlept')
  let qualityEntries = sleepRepo.getDataByWeek(user.id, '2020/01/22', 'sleepQuality')
  sleepWeekList.innerHTML = '';
  sleepEntries.forEach((entry, i) => {
    sleepWeekList.innerHTML += `
      <li class="item">
        <div class="label">Day ${i + 1}</div>
        <div class="progress-bar">
          <div class="progress" style="width: 75%;" ></div>
        </div>
        <div class="value">${entry}hrs</div>
        <div class="label">Quality: ${qualityEntries[i]}</div>
      </li>
    `
  });
}

const updateWeekHydration = () => {
  let user = activityRepo.currentUser
  let hydrationEntries = hydrationRepo.getWeekOunces(user.id, '2020/01/22')
  hydrationWeekList.innerHTML = '';
  hydrationEntries.forEach((entry, i) => {
    hydrationWeekList.innerHTML += `
      <li class="item">
        <div class="label">Day ${i + 1}</div>
        <div class="progress-bar">
          <div class="progress" style="width: 75%;" ></div>
        </div>
        <div class="value">${entry}</div>
        <div class="label">Ouces per day</div>
      </li>
    `
  });

}
