
import Chart from 'chart.js/auto'; 

const sleepChart = document.getElementById('sleep-chart');
const hydrationChart = document.getElementById('hydration-chart');
const stepsChart = document.getElementById('steps-chart');
console.log("blabvlabalba");

let mySleepChart = new Chart(sleepChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              '#300264f5',
              '#77777777',
              '#0fa2b6f2'
            ],
            hoverOffset: 4
          }]
    },
    options: {
        cutout: '75%',
        radius: '65%',
        plugins: {
            legend: {
                display: false,
            }
        }
    }
});


let myHydrationChart = new Chart(hydrationChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              '#300264f5',
              '#77777777',
              '#0fa2b6f2'
            ],
            hoverOffset: 4
          }]
    },
    options: {
        cutout: '75%',
        radius: '65%',
        plugins: {
            legend: {
                display: false,
            }
        }
    }
});


let myStepsChart = new Chart(stepsChart, {
    type: 'doughnut',
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              '#300264f5',
              '#77777777',
              '#0fa2b6f2'
            ],
            hoverOffset: 4
          }]
    },
    options: {
        cutout: '75%',
        radius: '65%',
        plugins: {
            legend: {
                display: false,
            }
        }
    }
});

export {mySleepChart, myHydrationChart, myStepsChart};
