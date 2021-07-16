// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
import datepicker from 'js-datepicker';
import { myStepsChart, myHydrationChart,mySleepChart } from './data/user-charts';
import Chart from 'chart.js/auto'; 
import userData from './data/users';
import UserRepository from './UserRepository';


const calendar = datepicker('#calendar-input');
// const calendarIcon = document.querySelector('#calendar img');

// calendarIcon.addEventListener('click', (event) => {
//     event.stopPropagation();
//     calendar.show();
//     console.log("im here!!");
// });

const friendsChart = document.getElementById('friends-avarage-chart');

const friendlabels = ['friend1', 'friend2', 'friend3','friend4','friend5'];

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
