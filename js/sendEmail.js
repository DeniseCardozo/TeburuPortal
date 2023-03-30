const sendEmail = document.querySelector('#emailA')

const emails = agregarUsuariosLista()
const subject = "Tu cuenta de Teburu Portal está lista"



function handleSendEmail(event) {
    event.preventDefault();

   
        const pass = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);

        sendEmail.setAttribute('href', `mailTo:${emails.toString()}?subject=${subject}&body=Bienvenido Teburu Portal! %0A %0A - Debes utilizar tu email brindado por tu empresa %0A - Tu contraseña es ${pass} %0A Porfavor luego de iniciar sesión  por primera vez, cambie la contraseña. %0A  %0A Puedes ingresar a la app desde este link: http://127.0.0.1:5501/index.html %0A %0A Gracias por usar Teburu Portal!`)

        sendEmail.click()

}


form.addEventListener('submit', handleSendEmail)