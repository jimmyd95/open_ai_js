import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

// Loading with dots, looks fancy 
function loader(element){
  element.textContent = ''

  loadInterval = setInterval(() => {
    element.textContent += '♥';

    if(element.textContent === '♥♥♥♥♥'){
      element.textContent = '';
    }
  }, 300);
}

// Allow the response to display every 20 mili-second interval
function typer(element, text){
  let index = 0;

  let interval = setInterval(() => {
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index++;
    }else{
      clearInterval(interval)
    }
  }, 20);
}

// Make the ID turly unique, timestamp + math-rand string
// Unique ID will make each element well... unique
function generateUniqueID(){

  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexaString = randomNumber.toString(16)

  return `id-${timestamp}-${hexaString}`;
}

// the basic convo div sturcture
function convo(AI, value, uniqueID){
  return(
    `
      <div class="wrapper ${AI && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img 
              src=${AI ? bot : user} 
              alt="${AI ? 'bot' : 'user'}" 
            />
          </div>
          <div class="message" id=${uniqueID}>${value}</div>
        </div>
      </div>
    `
  )
}


// Handles submission and response interaction
const submission = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // Generate user chat
  chatContainer.innerHTML += convo(false, data.get('prompt'))

  form.reset(); // clear space

  //Generate bot chat
  const uniqueID = generateUniqueID();
  chatContainer.innerHTML += convo(true, ' ', uniqueID)

  // scroll down when new text prompts
  chatContainer.scrollTop = chatContainer.scrollHeight

  // assign unique ID
  const messageDiv = document.getElementById(uniqueID)

  // load the div with '...'
  loader(messageDiv)

  // fetch data from openAI API, create new openAI responses
  const response = await fetch ('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt') // where you get the fancy text
    })
  })

  clearInterval(loadInterval) // stop the loading animation
  messageDiv.innerHTML = ' ' // clear the loading dots despite its status
  
  if(response.ok){
    const data = await response.json() // get the response from backend
    const parsedData = data.bot.trim()

    typer(messageDiv, parsedData)
  }else{
    const err = await response.text()

    messageDiv.innerHTML = 'YOU FOUND THE BUG, FIGURE IT OUT OR YOU DIE'
    alert(err)
  }
}

// Click submit or press enter to send text
form.addEventListener('submit', submission)
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    submission(e)
  }
})