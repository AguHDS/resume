const vars = {
  // DOM
  flexOpts: document.querySelector('.flex-options'),
  flexTop: `<div class="flexbuttons-top">
  <button type="button" class="btn btn-primary" id="btn-technologies-top">Tecnologías</button>
  <button type="button" class="btn btn-primary" id="btn-projects-top">Proyectos</button>
  <button type="button" class="btn btn-primary" id="btn-about-top">Sobre mí</button>
  </div>`,
  flexRight:`<div class="flexbuttons-right">
  <button type="button" class="btn btn-primary" id="btn-technologies-right">Tecnologías</button>
  <button type="button" class="btn btn-primary" id="btn-projects-right">Proyectos</button>
  <button type="button" class="btn btn-primary" id="btn-about-right">Sobre mí</button>
  </div>`,

  BUTTONS: {
    USES: 'btn-uses',
    PRACTICE: 'btn-practice',
    PROF: 'btn-pro',

    //getIcons
    iArray: function() {
      let iconsArr = document.querySelector('.container-img').children;
      iconsArr = Array.from(iconsArr);

     let iconsUses = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5]];
     let iconsPractice = [iconsArr[4], iconsArr[6], iconsArr[9]];
     let iconsProf = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5], iconsArr[7], iconsArr[8]];
     return {
      iconsUses: iconsUses,
      iconsPractice: iconsPractice,
      iconsProf: iconsProf
     };
    },
    initializeButtonStatus: function() {
      const setIcons = this.iArray();
      const buttonStates = {
        [this.USES]: { number: vars.number, icons: setIcons.iconsUses},
        [this.PRACTICE]: { number: vars.number, icons: setIcons.iconsPractice},
        [this.PROF]: { number: vars.number, icons: setIcons.iconsProf}
      };
      return { setIcons, buttonStates };
    }
  },

  // logic
  number: undefined,
};

const flexWidth = ()=> {
  let width = screen.width;
  width >= 1024 ? vars.flexOpts.innerHTML = vars.flexRight : vars.flexOpts.innerHTML = vars.flexTop;
};
window.addEventListener('load', flexWidth);
window.addEventListener('resize', flexWidth);

window.addEventListener('resize', ()=>{
  console.log('asd')
});

const showTechIcons = (e)=> {
  const { id } = e.target;
  const { setIcons, buttonStates } = vars.BUTTONS.initializeButtonStatus();
  
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
    case vars.BUTTONS.USES:
      if(vars.number == 0) {
        buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
        vars.number = 1;
      }else {
        hideAll(buttonStates[vars.BUTTONS.PRACTICE].icons);
        hideAll(buttonStates[vars.BUTTONS.PROF].icons);
        buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
        vars.number = 0;
      };
    break;

    case vars.BUTTONS.PRACTICE:
      if(vars.number == 3) {
        buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
        vars.number = 2;
      }else {
        hideAll(buttonStates[vars.BUTTONS.USES].icons);
        hideAll(buttonStates[vars.BUTTONS.PROF].icons);
        buttonStates[vars.BUTTONS.PRACTICE].icons.forEach(e => e.classList.remove('opacity'));
        vars.number = 3;
      };
    break;
    
    case vars.BUTTONS.PROF:
    if(vars.number == 5) {
      buttonStates[id].icons.forEach(e => e.classList.add('opacity'));
      vars.number = 4;
    }else {
      hideAll(buttonStates[vars.BUTTONS.USES].icons);
      hideAll(buttonStates[vars.BUTTONS.PRACTICE].icons);
      buttonStates[id].icons.forEach(e => e.classList.remove('opacity'));
      vars.number = 5;
    };
    break;
  }
};
const filteredValues = Object.values(vars.BUTTONS).filter(v => typeof v !== 'function');
filteredValues.forEach(bId => document.getElementById(bId).addEventListener('click', showTechIcons));