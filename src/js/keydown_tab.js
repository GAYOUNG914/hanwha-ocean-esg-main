import * as state from './state';
import { $body, $header } from "./common";

const $btnSubsidiary = document.querySelector('#FOOTER .btn-subsidiary_more');
const $subsidiaryList = document.querySelector('#FOOTER .f_subsidiary_list');
const $subsidiaryListUl = document.querySelector('#FOOTER .f_subsidiary_list ul');

const $gnbDepth1 = document.querySelector('#HEADER .depth1_area');
const $gnbDepth2 = document.querySelector('#HEADER .depth2_box ul li a');
const firstFocusableElement = document.querySelector('#HEADER #GNB .logo_area .logo');
const lastFocusableElement = document.querySelector('#HEADER #GNB .other_all_menu .btn_all_menu');


document.addEventListener('keydown', function(event) {
  if (event.key === 'Tab'|| event.key === '\t'|| event.keyCode === 9) {
    const focusedElement = document.activeElement;
    
    // 패밀리 사이트
    if($btnSubsidiary.contains(focusedElement)){
      $btnSubsidiary.classList.add('on');
      $subsidiaryList.classList.add('on');
    }else if(!$subsidiaryListUl.contains(focusedElement)){
      $btnSubsidiary.classList.remove('on');
      $subsidiaryList.classList.remove('on');
      $subsidiaryListUl.scrollTop = 0;
    }

    // 메가 메뉴 열렸을때 포커스 벗어나지 않게 
    if($body.classList.contains('all_menu')){
      $header.setAttribute('aria-modal', 'true');
      focusAreaIn(event, focusedElement, firstFocusableElement, lastFocusableElement)
    }else{
      $header.setAttribute('aria-modal', 'false');
    }

    if(state.states.media ==='desktop'){
      if($header.contains(focusedElement)) {
        // gnb 활성화
        $header.classList.add('gnb_enter');
      }else{
        $header.classList.remove('gnb_enter');
      }
    }else{

      if($header.contains(focusedElement)) {
        // gnb 활성화
        
        $body.classList.add('all_menu');
        $body.classList.remove('close_all_menu');
        $gnbDepth1.classList.add('all_menu_grid');

      }else {
        $body.classList.remove('all_menu')
        $body.classList.add('close_all_menu')
        $gnbDepth1.classList.remove('all_menu_grid');

      }

    }
    
  }
});

export function focusAreaIn(e,_focusedElement, _elF, _elL){

  if (e.shiftKey) { 
    // shift + tab
    if (_focusedElement === _elF) {
      e.preventDefault();
      _elL.focus();
    }
  } else { 
    // tab
    if (_focusedElement === _elL) {
      e.preventDefault();
      _elF.focus();
    }
  }
}