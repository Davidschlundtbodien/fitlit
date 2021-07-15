// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
import Chart from 'chart.js/auto'; 
import userData from './data/users';
import UserRepository from './UserRepository';


const sleepChart = document.getElementById('sleep-chart');

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

const hydrationChart = document.getElementById('hydration-chart');

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

const stepsChart = document.getElementById('steps-chart');

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