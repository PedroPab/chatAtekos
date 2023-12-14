const socket = io()

const allMessages = document.getElementById('allMessages')
const sendMesage = document.getElementById('sendMesage')
sendMesage.addEventListener('click', () => {
  const message = document.getElementById('message')
  socket.emit('message', { message: message.value })
  message.value = ''
})

//recibimos un mensage nuevo
socket.on('message', data => {
  console.log(`new message`);
  const { user, message, time } = data

  const msg = document.createRange().createContextualFragment(
    /*html*/`
     <div class="message">
       <div class="imgContainer">
         <img src="img/michiConSombreroDeBaquero.jpeg" alt="Foto de perfil">
       </div>
       <div class="messageBody">
         <div class="userInfo">
           <span class="userName">${user}</span>
           <span class="time">${time}</span>
         </div>
         <p>${message}</p>
       </div>
     </div>
  `)

  allMessages.append(msg)
})