import UserRepository from './UserRepository'
import HydrationRepository from './HydrationRepository'
import SleepRepository from './SleepRepository'
import ActivityRepository from './ActivityRepository'
import {mySleepChart, myHydrationChart, myStepsChart, userFriendsChart} from './data/user-charts'

//Repostories
let userRepo, hydrationRepo, sleepRepo, activityRepo

//DATA Fetching
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
  updateDOM()
}

//SELECTORS
const userGreeting = document.getElementById('helloUser')
const userInfo = document.getElementById('userInfo')
const userStepsAvg = document.getElementById('userStepsAvg')
const userQualityAvg = document.getElementById('userQualityAvg')
const friendsList = document.getElementById('friendsList')
const avgStepGoal = document.getElementById('avgStepGoal')
const sleepWeekList = document.getElementById('sleepWeekList')
const hydrationWeekList = document.getElementById('hydrationWeekList')
const activityWeekList = document.getElementById('activityWeekList')

//DATA Rendering for DOM
const updateDOM = () => {
  let user = activityRepo.currentUser
  let date = '2020/01/22'
  updateUserCard(user)
  updateFriendsList(user)
  updateHydrationCard(user, date)
  updateSleepCard(user, date)
  updateActivityCard(user, date)
  updateWeekSleep(user, date)
  updateWeekHydration(user, date)
}

//USER INFO
const updateUserCard = (user) => {
  userGreeting.innerText = `Hello, ${user.firstName()}!`
  userInfo.innerText = `📥 ${user.email}   🏡${user.address}`
}

//FRIENDS LIST and CHART
const updateFriendsList = (user) => {
  friendsList.innerHTML = "";
  let userFriends = user.friends.map(friend => userRepo.findUserByID(friend))
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

//TODAY CARDS
const updateHydrationCard = (user, date) => {
  let ouncesForWeek = hydrationRepo.getWeekOunces(user.id, date)
  updateDonutChart(myHydrationChart, ouncesForWeek[0], 110)
  userHydrationAvg.innerText = `Avg Consumed Daily: ${hydrationRepo.getTotalAvg(user.id)} oz`
}

const updateSleepCard = (user, date) => {
  let sleepForWeek = sleepRepo.getDataByWeek(user.id, date, 'hoursSlept')
  let sleepQualityForWeek = sleepRepo.getDataByWeek(user.id, date, 'sleepQuality')
  updateDonutChart(mySleepChart, sleepForWeek[0], 8)
  userQualityAvg.innerText = `Avg Sleep Quality: ${sleepRepo.getUserAvg(user.id, 'sleepQuality')}`
}

const updateActivityCard = (user, date) => {
  let stepsForToday = activityRepo.findUserActivityData(user.id, date, 'numSteps')
  updateDonutChart(myStepsChart, stepsForToday, user.dailyStepGoal)
  userStepsAvg.innerText = `Avg Daily Steps: ${activityRepo.getUserAvg(user.id, 'numSteps')}`
}

const updateDonutChart = (chart, value, total) => {
  chart.data.datasets[0].data[0] = value
  chart.data.datasets[0].data[1] = total - value
  chart.update()
}

//WEEK CARDS
const updateWeekSleep = (user, date) => {
  let sleepEntries = sleepRepo.getDataByWeek(user.id, date, 'hoursSlept')
  let qualityEntries = sleepRepo.getDataByWeek(user.id, date, 'sleepQuality')
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

const updateWeekHydration = (user, date) => {
  let hydrationEntries = hydrationRepo.getWeekOunces(user.id, date)
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
