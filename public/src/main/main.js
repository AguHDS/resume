'use strict'

let feats = document.querySelector('.dynamic-feats');


export const getFeatures = () => {
  console.log('enviando la request') //quitar eso despues okkk
  const features = './src/features/features.html';
  
  return fetch(features)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
      return response.text();
    })
    .then(html => {
      feats.innerHTML = html;
      console.log('se puso el HTML') //quitar eso despues
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    });
};

const navButtons = ['contact', 'aboutMe-mainButton', 'projects-mainbutton'];
const setupNavButtons = () => {
  
  const aboutMe_features_T = document.getElementById('btn-about-top'); //pendiente arreglar esto que el scroll se rompe es una mierda....
  const project_features_R = document.getElementById('btn-projects-right');
  const project_features_T = document.getElementById('btn-projects-top');

  navButtons.forEach((id)=> {
    let button = document.getElementById(id);
    button.addEventListener('click', (event)=>{
      const targetElement = document.getElementById('btn-about-right');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
  })
}

setupNavButtons();

const btn = document.getElementById('button');

const recaptchaCallback = ()=> { //hacer esto con node (desde el servidor) para evitar la manipulacion desde el frontend inspeccionando
  btn.classList.remove('disabled');
  btn.classList.add('active');
  btn.disabled = false;
};

window.recaptchaCallback = recaptchaCallback;

const warning_email = document.querySelector('.warning-email');

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const email_value = document.getElementById('email_id').value;

  if(!regex.test(email_value)) {
   warning_email.style.display = 'block';
  }else {
   warning_email.style.display = 'none';
   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_2rjpnb2';

   emailjs.sendForm(serviceID, templateID, this) //emailjs service uses "this" to access form's fields data
    .then(() => {
      btn.value = 'Enviar';
      alert('Enviado');
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
  }
});




/* $aboutMe.on('click', ()=> {
    
const aboutMe_features = $('#btn-about-right');
  window.scrollTo({
    top: 900,
    behavior: 'smooth'
  });
  if (aboutMe_features) {
    aboutMe_features.click();
  } else {
    console.error("El elemento 'btn-about-right' no existe.");
  }
}); */

const checkFields = ()=> {
  const captchaDiv = document.querySelector('.captcha');
  const fields = ['from_name', 'email_id', 'message'].map(e => document.getElementById(e));
  const fieldsValues = fields.map(e => e.value.trim());
  
   if (fieldsValues.every(value => value !== '')) {
    captchaDiv.style.display = 'flex';
  } else {
    captchaDiv.style.display = 'none';
  }
  return fields
};

checkFields().forEach(e => e.addEventListener('input', checkFields));