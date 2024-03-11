const vars = {
  // DOM
  BUTTONS: {
    USES: 'btn-uses',
    PRACTICE: 'btn-practice',
    PROF: 'btn-pro'
  },
  //pija

  // logic
  number: undefined,
};

let iconsArr = document.querySelector('.container-img').children;
iconsArr = Array.from(iconsArr);
let iconsUses = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5]];
let iconsPractice = [iconsArr[4], iconsArr[6], iconsArr[9]];
let iconsProf = [iconsArr[0], iconsArr[1], iconsArr[2], iconsArr[3], iconsArr[4], iconsArr[5], iconsArr[7], iconsArr[8]];

const showTechIcons = (e)=> {
  const { id } = e.target;
  const hideAll = ()=>{ //optimizar para usar solo un bucle
    for(let i = 0; i < iconsUses.length; i++) {
      iconsUses[i].classList.add('opacity');
    };
    for(let i = 0; i < iconsPractice.length; i++) {
      iconsPractice[i].classList.add('opacity');
    };
    for(let i = 0; i < iconsProf.length; i++) {
      iconsProf[i].classList.add('opacity');
    };
  }
  const buttonStates = {
    [vars.BUTTONS.USES]: { number: vars.number, icons: iconsUses},
    [vars.BUTTONS.PRACTICE]: { number: vars.number, icons: iconsPractice},
    [vars.BUTTONS.PROF]: { number: vars.number, icons: iconsProf}
  };
  
  switch(id) {
    case vars.BUTTONS.USES:
      if(vars.number == 0) {
        buttonStates[vars.BUTTONS.USES].icons.forEach(e => e.classList.add('opacity'));
        vars.number = 1;
      }else {
        hideAll(buttonStates[vars.BUTTONS.PRACTICE].icons);
        hideAll(buttonStates[vars.BUTTONS.PROF].icons);
        buttonStates[vars.BUTTONS.USES].icons.forEach(e => e.classList.remove('opacity'));
        vars.number = 0;
      };
    break;

    case vars.BUTTONS.PRACTICE:
      if(vars.number == 3) {
        buttonStates[vars.BUTTONS.PRACTICE].icons.forEach(e => e.classList.add('opacity'));
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
      buttonStates[vars.BUTTONS.PROF].icons.forEach(e => e.classList.add('opacity'));
      vars.number = 4;
    }else {
      hideAll(buttonStates[vars.BUTTONS.USES].icons);
      hideAll(buttonStates[vars.BUTTONS.PRACTICE].icons);
      buttonStates[vars.BUTTONS.PROF].icons.forEach(e => e.classList.remove('opacity'));
      vars.number = 5;
    };
    break;
  }
};
Object.values(vars.BUTTONS).forEach(btn => document.getElementById(btn).addEventListener('click', showTechIcons));
