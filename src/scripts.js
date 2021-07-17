// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/Fitlit_logo.svg';
import './images/calendar.svg';
import './images/friends_icon.png';
import './images/cup.png';
import './images/foot_icon.svg';
import './images/moon_weather.svg';


console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
import datepicker from 'js-datepicker';
import { myStepsChart, myHydrationChart, mySleepChart, userFriendsChart} from './data/user-charts';
import Chart from 'chart.js/auto'; 
import userData from './data/users';
import main from './main'
import User from './User'
import UserRepository from './UserRepository';


const calendar = datepicker('#calendar-input');
// // const calendarIcon = document.querySelector('#calendar img');

