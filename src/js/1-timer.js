import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const button = document.querySelector('button[data-start]');
const input = document.querySelector('input#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() >= selectedDates[0]) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
    }
    userSelectedDate = selectedDates[0];
  },
};

const selector = 'input#datetime-picker';

flatpickr(selector, options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    if (!userSelectedDate) {
      return;
    }

    button.disabled = true;
    input.disabled = true;

    this.intervalId = setInterval(() => {
      const remainingTime = userSelectedDate.getTime() - Date.now();
      if (remainingTime < 0) {
        this.stop();
      } else {
        this.onTick(this.convertMs(remainingTime));
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);

    input.disabled = false;
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const daysElem = document.querySelector('span[data-days]');
const hoursElem = document.querySelector('span[data-hours]');
const minutesElem = document.querySelector('span[data-minutes]');
const secondsElem = document.querySelector('span[data-seconds]');

const timer = new Timer({
  onTick: updateClockface,
});

button.addEventListener('click', timer.start.bind(timer));

function updateClockface({ days, hours, minutes, seconds }) {
  daysElem.textContent = pad(days);
  hoursElem.textContent = pad(hours);
  minutesElem.textContent = pad(minutes);
  secondsElem.textContent = pad(seconds);
}
