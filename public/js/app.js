const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const fetchWeather = (address) =>
{
    fetch('/weather?address='+address).then(res => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }

        })
    }).catch(err => {
        messageOne.textContent = err;
    });
};

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');



weatherForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetchWeather(searchInput.value)
});
