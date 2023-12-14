const buttonRegister = document.getElementById('buttonLogin')
const userName = document.getElementById('userName')

buttonRegister.addEventListener('click', () => {
  if (userName.value !== '') {
    document.cookie = `userName=${userName.value}`

    //madar imagen asciada con el nombre de usuario
    // mandarImagenUser(userName.value)
    //   .then((data) => {

    //   })
    //   .catch(error => {
    //     console.log(error)

    //   })
    document.location.href = '/'
    return
  }

  alert('escribe un nombre')


})

function mandarImagenUser(userName) {
  new Promise((resolve, reject) => {
    const imageUser = document.getElementById('imageUser');
    const formData = new FormData();
    // Añade la imagen seleccionada al formulario
    if (imageUser.files.length > 0) {
      formData.append('image', imageUser.files[0]);
    }
    console.log("🚀 ~ file: register.js:23 ~ newPromise ~ formData:", formData)

    // Realiza la solicitud al servidor
    fetch('/imgUser', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        resolve('todo melo')
        alert('Imagen subida con éxito: ' + JSON.stringify(data));
      })
      .catch(error => {
        reject(error)
        console.error('Error al subir la imagen:', error);
      });
  })

}