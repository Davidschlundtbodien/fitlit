
import Chart from 'chart.js/auto';

const sleepChart = document.getElementById('sleep-chart');
const hydrationChart = document.getElementById('hydration-chart');
const stepsChart = document.getElementById('steps-chart');
const friendsChart = document.getElementById('friends-avarage-chart');
const weekBtn = document.querySelectorAll('.chart .card > button');
const backBtn = document.querySelectorAll('.chart .card .latest-week button');

// I think this one maybe let not const.
const showLastWeek = ((e) => {
    e.target.nextElementSibling.classList.remove('hidden');
});
const hideLastWeek =((e) => {
    e.target.parentElement.classList.add('hidden');
});

weekBtn.forEach(btn => {
    btn.addEventListener('click', showLastWeek)
});

backBtn.forEach(btn => {
    btn.addEventListener('click', hideLastWeek)
});


let friendlabels = ['friend1', 'friend2', 'friend3','friend4','friend5'];


let mySleepChart = new Chart(sleepChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Sleep hours',
            'Goal',

          ],
          datasets: [{
            label: 'My First Dataset',
            data: [7, 1],
            backgroundColor: [
             '#0fa2b6f2',
              '#73519b',

            ],
            hoverOffset: 4
          }]
    },
    options: {
        cutout: '75%',
        radius: '65%',
        plugins: {
            legend: {
                display: true,
            }
        }
    }
});

let myHydrationChart = new Chart(hydrationChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Consumed oz',
            'Daily need',
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [100, 300],
            backgroundColor: [
              '#f3871ede',
              '#73519b',

            ],
            hoverOffset: 4
          }]
    },
    options: {
        cutout: '75%',
        radius: '65%',
        plugins: {
            legend: {
                display: true,
            }
        }
    }
});

let myStepsChart = new Chart(stepsChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Steps today',
            'Goal',
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [100, 300],
            backgroundColor: [
              '#0fa2b6f2',
              '#73519b',
            ],
            hoverOffset: 4
          }]
    },
    options: {
        reponsive: true,
        cutout: '75%',
        radius: '65%',
        plugins: {
            legend: {
                display: true,

            }
        }
    }
});

let userFriendsChart = new Chart(friendsChart, {
    type: 'bar',
    data: {
        labels: friendlabels,
        datasets: [{
          label: 'My friends Steps',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }],
    },
    options: {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
      },
    }
});

export {mySleepChart, myHydrationChart, myStepsChart, userFriendsChart};
