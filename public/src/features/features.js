import { getFeatures } from '../main/main.js';

let ready = false;

const waitForFeatures = async () => {
   if (!ready) { //no soluciona el problema del todo, si se debugea se ve que el estado de ready se harcodea a true y no cambia a true cuando la promesa ya esta resuelta, ya hay que buscar una forma de hacer esto pero que verifique que la promesa este resuelta con el dom implementado correctamente
    ready = true
    await getFeatures();
  }

  const vars = {

    BUTTONS: {
      //features-right buttons
      TECHS_R: 'btn-technologies-right',
      PROJECTS_R: 'btn-projects-right',
      ABOUT_R: 'btn-about-right',

      //features-top buttons
      TECHS_T: 'btn-technologies-top',
      PROJECTS_T: 'btn-projects-top',
      ABOUT_T: 'btn-about-top',

      //techs buttons
      USES: 'btn-uses',
      PRACTICE: 'btn-practice',
      PROF: 'btn-pro',

      //projects arrows
      UP_LEFT_Arrow: 'up-arrow',
      DOWN_RIGHT_Arrow: 'down-arrow',
      
      // get all images and store them in different arrays
      iArray: function() {
        let iconsArr = document.querySelector('.container-img').children;
        iconsArr = Array.from(iconsArr);

        let iconsUses = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5]];
        let iconsPractice = [iconsArr[5], iconsArr[6], iconsArr[9], iconsArr[10]];
        let iconsProf = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5], iconsArr[7], iconsArr[8]];

        return { 
          iconsUses: iconsUses, 
          iconsPractice: iconsPractice, 
          iconsProf: iconsProf 
        };
      },
      
      // asign previous array-images as key-values to the buttons to work later in showTechIcons()
      initializeButtonStatus: function() {
        const setIcons = this.iArray();

        const buttonStates = {
          [this.USES]: { icons: setIcons.iconsUses },
          [this.PRACTICE]: { icons: setIcons.iconsPractice },
          [this.PROF]: { icons: setIcons.iconsProf }
        };
        return { setIcons, buttonStates };
      }
    }
  };
  
  return vars;
};

document.addEventListener('DOMContentLoaded', function() {
  function flexWidth() {
    const flexRight = document.querySelector('.flexbuttons-right');
    const flexTop = document.querySelector('.flexbuttons-top');

    if (window.innerWidth >= 1024) {
      flexTop.style.display = 'none';
      flexRight.style.display = 'flex';
    } else {
      flexTop.style.display = 'flex';
      flexRight.style.display = 'none';
    }
  }
  
  window.addEventListener('load', flexWidth);
  window.addEventListener('resize', flexWidth);
});


let number = undefined;

const showTechIcons = async(e)=> {
  const data = await waitForFeatures();
 
  const { id } = e.target;
  const { setIcons, buttonStates } = data.BUTTONS.initializeButtonStatus();
  
  const addOpacity = ()=> {
    const allIcons = [
      ...setIcons.iconsUses,
      ...setIcons.iconsPractice,
      ...setIcons.iconsProf
    ];

    for(let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.add('opacity');
    };
  };
  
  switch(id) {
    case data.BUTTONS.USES:
      if(number == 0) {
        buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
        number = 1;
      }else {
        addOpacity(buttonStates[data.BUTTONS.PRACTICE].icons);
        addOpacity(buttonStates[data.BUTTONS.PROF].icons);
        buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
        number = 0;
      };
    break;

    case data.BUTTONS.PRACTICE:
      if(number == 3) {
        buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
        number = 2;
      }else {
        addOpacity(buttonStates[data.BUTTONS.USES].icons);
        addOpacity(buttonStates[data.BUTTONS.PROF].icons);
        buttonStates[data.BUTTONS.PRACTICE].icons.forEach(e => e.classList.remove('opacity'));
        number = 3;
      };
    break;
  
    case data.BUTTONS.PROF:
    if(number == 5) {
      buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
      number = 4;
    }else {
      addOpacity(buttonStates[data.BUTTONS.USES].icons);
      addOpacity(buttonStates[data.BUTTONS.PRACTICE].icons);
      buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
      number = 5;
    };
    break;
  }
};

const setupEventListeners = async () => {
  const data = await waitForFeatures();

  const buttons_id = Object.values(data.BUTTONS).filter(values => typeof values !== 'function');
  const flex_buttons = buttons_id.filter(id => id.includes('right') || id.includes('top'));
  const tech_buttons = buttons_id.filter(id => !id.includes('right') && !id.includes('top') && !id.includes('arrow'));
  
  const techs = document.querySelector('.techs');
  const projects = document.querySelector('.myprojects-carousel');
  const about = document.querySelector('.about-me');
  const msg = document.querySelector('.initial-message');

  const hideAll = ()=> {
    techs.style.display = 'none';
    projects.style.display = 'none';
    about.style.display = 'none';
  }

  flex_buttons.forEach(value => {
    let button = document.getElementById(value);
  
    button.addEventListener('click', (e) => {
      const { id } = e.target;
      msg.style.display = 'none';
  
      if (id === data.BUTTONS.TECHS_R || id === data.BUTTONS.TECHS_T) {
        hideAll();
        techs.style.display = 'block';
      } else if (id === data.BUTTONS.PROJECTS_R || id === data.BUTTONS.PROJECTS_T) {
        hideAll();
        projects.style.display = 'flex';
      } else if (id === data.BUTTONS.ABOUT_R || id === data.BUTTONS.ABOUT_T) {
        hideAll();
        about.style.display = 'flex';
      }
    });
  });

  tech_buttons.forEach(value => {
    let button = document.getElementById(value);
    button.addEventListener('click', showTechIcons);
  });
};

setupEventListeners();


const test  = ()=> {
  waitForFeatures().then((data)=>{
    console.log(data)
  })

  
}
test();























/* //texto dinamico PARA BOTONES DE TEC
$(document).ready(function() {
  var texto = "Este es un texto secuencial.";
  var index = 0;
  var timer;

  // Función para agregar una letra al texto
  function agregarLetra() {
      $('#texto').append(texto[index]);
      index++;
      if (index === texto.length) {
          clearInterval(timer); // Detiene el intervalo cuando se ha agregado todo el texto
      }
  }

  // Evento al hacer clic en el botón "Iniciar"
  $('#iniciar').click(function() {
      timer = setInterval(agregarLetra, 100); // Inicia el intervalo para agregar letras
  });

  // Evento al hacer clic en el botón "Reiniciar"
  $('#reiniciar').click(function() {
      $('#texto').empty(); // Vacía el texto
      index = 0; // Reinicia el índice
      clearInterval(timer); // Detiene el intervalo si está en curso
  });
}); */