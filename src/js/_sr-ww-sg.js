import * as state from './state';
import { accordion } from './accordion.js';
export const $SG = document.querySelector('#SG');

export function srwwsg() {

  const $accordion = $SG.querySelector('.common-accordion-list');

  function init() {
    new accordion({ accordionElem: $accordion })
  }

  window.addEventListener('load', init())
}
if ($SG) srwwsg();
