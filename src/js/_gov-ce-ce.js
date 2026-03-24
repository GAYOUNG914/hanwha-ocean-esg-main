import { accordion } from './accordion.js';
export const $CE = document.querySelector('#CE');

export function ceInit() {

  const $accordion = $CE.querySelector('.common-accordion-list');

  function init() {
    if($accordion){
      new accordion({ accordionElem: $accordion })
      }
    }

  window.addEventListener('load', init())
}
if ($CE) ceInit();



