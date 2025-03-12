import iziToast from 'izitoast';

const refs = {
  form: document.querySelector('.form'),
};

const onLoadPage = () => {
  iziToast.show({
    close: false,
    position: 'topRight',
    progressBarColor: '#0071BD',
    title: 'Hello',
    titleColor: '#FFFFFF',
    message: 'Welcome',
    messageColor: '#FFFFFF',
    backgroundColor: '#0099FF',
  });
};
onLoadPage();

const onSubmitForm = event => {
  event.preventDefault();
  const inputValue = document.querySelector('.delay').value;
  const selectedState = document.querySelector('[name="state"]:checked').value;

  if (!inputValue || isNaN(inputValue) || inputValue <= 0) {
    iziToast.show({
      close: false,
      position: 'topRight',
      progressBarColor: '#BB7B10',
      title: 'Caution',
      titleColor: '#FFFFFF',
      message: 'You forgot important data',
      messageColor: '#FFFFFF',
      backgroundColor: '#ffa000',
    });
    return;
  }

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(inputValue);
      } else {
        reject(inputValue);
      }
    }, inputValue);
  })
    .then(delay =>
      iziToast.show({
        close: false,
        position: 'topRight',
        progressBarColor: '#326101',
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#59A10D',
      })
    )
    .catch(delay => {
      iziToast.show({
        close: false,
        position: 'topRight',
        progressBarColor: '#B51B1B',
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
      });
    });
  refs.form.reset();
};

refs.form.addEventListener('submit', onSubmitForm);