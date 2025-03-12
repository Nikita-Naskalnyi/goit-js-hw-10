import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  button: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
};

refs.button.disabled = true;

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() <= 0) {
      iziToast.show({
        close: false,
        position: 'topRight',
        progressBarColor: '#B51B1B',
        title: 'Error',
        titleColor: '#FFFFFF',
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
      });
      refs.button.disabled = true;
      userSelectedDate = null;
      return;
    }
    refs.button.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const updateTimerDisplay = ({ days, hours, minutes, seconds }) => {
  refs.timer.querySelector('[data-days]').textContent = days
    .toString()
    .padStart(2, '0');
  refs.timer.querySelector('[data-hours]').textContent = hours
    .toString()
    .padStart(2, '0');
  refs.timer.querySelector('[data-minutes]').textContent = minutes
    .toString()
    .padStart(2, '0');
  refs.timer.querySelector('[data-seconds]').textContent = seconds
    .toString()
    .padStart(2, '0');
};

const startTimer = () => {
  intervalId = setInterval(() => {
    const data = userSelectedDate - Date.now();
    const time = convertMs(data);

    if (data <= 0) {
      clearInterval(intervalId);
      refs.button.disabled = true;
      document.querySelector('input#datetime-picker').disabled = false;
      return;
    }

    refs.button.disabled = true;
    document.querySelector('input#datetime-picker').disabled = true;
    updateTimerDisplay(time);
  }, 1000);
};

refs.button.addEventListener('click', startTimer);
flatpickr('input#datetime-picker', options);
