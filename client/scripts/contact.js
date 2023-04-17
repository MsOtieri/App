emailjs.init('rcsatNGnB_c2Dso33');
const form = document.querySelector('.php-email-form')

const sendEmail = () => {

    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
  
    const params = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    };
  
    emailjs.send('service_o30424p', 'template_okp5r0d', params)
    
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        form.reset()
      }, function(error) {
        console.log('FAILED...', error);
      });
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    sendEmail()
    

})
  