import { getFeatures } from '../main/main.js';

let number = undefined;
let feats = document.querySelector('.features'); //xd
const techButtons = ['']

const waitForFeatures = async () => {
  if(!feats) { //verifico si feats no existe, si no existe es porque el html dinamico no se agergó
    await getFeatures(); 
  }

  const vars = {
    //DOM
    flexBtns: document.querySelector('.flex-buttons'), //flex div to make main buttons responsive
    flexTop: `<div class="flexbuttons-top">
      <button type="button" class="btn btn-primary" id="btn-technologies-top" role="button" tabindex="0">Tecnologías</button>
      <button type="button" class="btn btn-primary" id="btn-projects-top" role="button" tabindex="0">Proyectos</button>
      <button type="button" class="btn btn-primary" id="btn-about-top" role="button" tabindex="0">Sobre mí</button>
    </div>`,
    flexRight: `<div class="flexbuttons-right">
      <button type="button" class="btn btn-primary" id="btn-technologies-right" role="button" tabindex="0">Tecnologías</button>
      <button type="button" class="btn btn-primary" id="btn-projects-right" role="button" tabindex="0">Proyectos</button>
      <button type="button" class="btn btn-primary" id="btn-about-right" role="button" tabindex="0">Sobre mí</button>
    </div>`,

    BUTTONS: {
      USES: 'btn-uses',
      PRACTICE: 'btn-practice',
      PROF: 'btn-pro',
      
      // Get all images and store them in different arrays
      iArray: function() {
        let iconsArr = document.querySelector('.container-img').children;
        iconsArr = Array.from(iconsArr);

        let iconsUses = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5]];
        let iconsPractice = [iconsArr[5], iconsArr[6], iconsArr[9], iconsArr[10]];
        let iconsProf = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5], iconsArr[7], iconsArr[8]];

        return { iconsUses: iconsUses, iconsPractice: iconsPractice, iconsProf: iconsProf };
      },
      initializeButtonStatus: function() {
        const setIcons = this.iArray();

        const buttonStates = {
          [this.USES]: { number: number, icons: setIcons.iconsUses },
          [this.PRACTICE]: { number: number, icons: setIcons.iconsPractice },
          [this.PROF]: { number: number, icons: setIcons.iconsProf }
        };
        return { setIcons, buttonStates };
      }
    }
  };
  return vars;// vars es parte del then asi que esto se puede quitar
};

const infoFeatures = ()=> {
  switch(id) {

  }
}

const flexWidth = async() => {
  const data = await waitForFeatures();
    let innerWidth = window.innerWidth;
    
    if (innerWidth >= 1024) {
      data.flexBtns.innerHTML = data.flexRight; //probablemente vuelve a ejecutar la funcion para ahcer el innerhtml, probar con display none en su lugar poniendo los botones directamente en el html
    } else {
      data.flexBtns.innerHTML = data.flexTop;
    }
};

window.addEventListener('load', ()=> {
  if(!feats) {
    flexWidth();
  }
});
window.addEventListener('resize',  flexWidth);

const showTechIcons = (e)=> {
  waitForFeatures().then((data)=> {
    
    const { id } = e.target;
    const { setIcons, buttonStates } = data.BUTTONS.initializeButtonStatus();
    
    const hideAll = ()=> {
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
          hideAll(buttonStates[data.BUTTONS.PRACTICE].icons);
          hideAll(buttonStates[data.BUTTONS.PROF].icons);
          buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
          number = 0;
        };
      break;
  
      case data.BUTTONS.PRACTICE:
        if(number == 3) {
          buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
          number = 2;
        }else {
          hideAll(buttonStates[data.BUTTONS.USES].icons);
          hideAll(buttonStates[data.BUTTONS.PROF].icons);
          buttonStates[data.BUTTONS.PRACTICE].icons.forEach(e => e.classList.remove('opacity'));
          number = 3;
        };
      break;
    
      case data.BUTTONS.PROF:
      if(number == 5) {
        buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
        number = 4;
      }else {
        hideAll(buttonStates[data.BUTTONS.USES].icons);
        hideAll(buttonStates[data.BUTTONS.PRACTICE].icons);
        buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
        number = 5;
      };
      break;
    }
  })
};

// Define una función asincrónica para inicializar los botones después de que waitForFeatures() se resuelva
const initializeButtons = async () => {
  await waitForFeatures(); 

   document.getElementById('btn-uses').addEventListener('click', showTechIcons);
   document.getElementById('btn-practice').addEventListener('click', showTechIcons);
   document.getElementById('btn-pro').addEventListener('click', showTechIcons);
   console.log('event listener agregado.')

};

// Llama a la función para inicializar los botones
initializeButtons();

