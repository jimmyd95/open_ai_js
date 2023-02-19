import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('chat_container');

let loadInterval;

// Loading with dots, looks fancy 
function loader(element){
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if(element.textContent === '.....'){
      element.textContent = '';
    }
  }, 300);
}

// Allow the response to display every 20 mili-second interval
function typer(element, text){
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length){
      element.innerHTML += text.chartAt(index);
      index++;
    }else{
      clearInterval(interval)
    }
  }, 20);
}

// Make the ID turly unique, timestamp + math-rand string
function generateUniqueID(){

  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexaString = randomNumber.toString(16)

  return `id-$(timestamp)-$(hexadecimalString)`;
}

function convo(AI, value, uniqueID){
  return(
    `
      <div class='wrapper ${AI && 'ai'}'>
        <div class='chat'>
          <div className='profile>
            <img
              src='${AI ? bot : user}'
              alt='${AI ? 'bot' : user}'
            />
          </div>
          <div class='message' id=${uniqueID}>${value}</div>
        </div>
      </div>
    `
  )
}

const submission = async(e) => {
  e.preventDefault();

  const data = new FormData(form);

  // Generate user chat
  chatContainer.innerHTML += convo(false, data.get('prompt'));

  form.reset();

  //Generate bot chat
  const uniqueID = generateUniqueID();
  chatContainer.innerHTML += convo(true, ' ', uniqueID);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueID);

  loader(messageDiv)
}

// Click submit or press enter to send text
form.addEventListener('submit', submission);
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    submission(e)
  }
})