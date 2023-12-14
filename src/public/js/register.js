//lista de las fotos que tenemos disponibles 
const listImgs = imgsList()
  .then(data => {
    //mostramso en el contendeor las images disponibles
    const listImgs = document.getElementById('listImgs')
    let rta = ''
    data.forEach((element, i) => {
      rta = rta + /*html */`
      <div>
        <label class="imgLabel">
          <input type="radio" name="selectedImage" value="${element}" class="imgRadio">
           <img src="/img/${element}" alt="foto de usuario">
        </label>
      </div>

      `
    });

    const content = document.createRange().createContextualFragment(rta)
    listImgs.append(content)


  })

const buttonRegister = document.getElementById('buttonLogin')
const userName = document.getElementById('userName')

buttonRegister.addEventListener('click', () => {
  if (userName.value !== '') {
    //la foto de usruario selecinado 
    let imgUser = getSelectedImageValue();
    console.log("🚀 ~ file: register.js:32 ~ buttonRegister.addEventListener ~ imgUser:", imgUser)
    if (!imgUser) imgUser = 'default.png'

    document.cookie = `userName=${userName.value}`
    document.cookie = `userImg=${imgUser}`

    document.location.href = '/'
    return
  }

  alert('escribe un nombre')


})


function imgsList() {
  return new Promise((resolve, reject) => {
    fetch("/imgs")
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta exitosa');
        }
        // Parsear la respuesta JSON en un arreglo
        return response.json();
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => reject([]))
  })
}

function getSelectedImageValue() {
  const radios = document.querySelectorAll('input[name="selectedImage"]:checked');
  return radios.length > 0 ? radios[0].value : null;
}