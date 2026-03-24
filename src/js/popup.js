import { $body, $header } from "./common";
import { gsap } from "gsap/all";
import { lenis } from "./smooth";
import { focusAreaIn } from "./keydown_tab";

let $pop_contain, $pop_inner
const $popup = document.querySelectorAll('.m_popup');
const $btnClose = document.querySelectorAll('.m_pop_close');
const $btnCloseOnly = document.querySelectorAll('.m_pop_close-only');
const $btnPopup = document.querySelectorAll("[data-popup]");
const $popupDim = document.querySelectorAll(".m_popup .dim");
let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

if($popup.length){
  $btnClose.forEach(_el => {
    _el.addEventListener('click', function(){
      hidePop('.m_popup')
    });
  });

  $btnCloseOnly.forEach(_el => {
    _el.addEventListener('click', function(event){
      event.currentTarget.closest('.m_popup').classList.remove('show');
    });
  });
  
  $btnPopup.forEach((_el) => {
    _el.addEventListener('click', function(){
      showPop(`#${_el.getAttribute('data-popup')}`)
    })
  });

  $popupDim.forEach(_el => {
    _el.addEventListener('click', function(event){
      if(!event.currentTarget.classList.contains('none-click')){
        hidePop('.m_popup')
      }
    });
  });
  
  
}

export function showPop(_id){
  const elScroll = document.querySelector(_id+' .pop_cnt_main');
  let $pop_contain, $pop_inner
  let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  const $body = document.body;
  const $header = document.querySelector('#HEADER');

  // lenis.stop();
  if(elScroll) elScroll.scrollTop = 0;
  $body.style.overflow = 'hidden';
  $body.style.paddingRight = scrollBarWidth + 'px';
  $header.style.transition = 'none';
  $header.style.width = 'calc(100% - '+scrollBarWidth + 'px)';

  $pop_contain = document.querySelector(_id);
  $pop_inner = $pop_contain.querySelector('.pop_inner');
  
  $body.classList.add('show_pop');
  $pop_contain.classList.add('show');
  if(window.innerHeight >= $pop_inner.clientHeight){
    $pop_inner.style.top = '50%';
    $pop_inner.style.marginTop = (-1 * ($pop_inner.clientHeight / 2 + 20)) + 'px'
    // gsap.set($pop_inner,{marginTop: (-1 * ($pop_inner.clientHeight / 2 + 20) + 'px')});
    $pop_inner.closest('.m_popup').classList.contains('descriptionPopup') ? $pop_inner.style.marginTop = 0 : '';
    $pop_inner.style.opacity=1
  }else{
    $pop_inner.style.top = 0;
    $pop_inner.style.marginTop = 0;
    $pop_inner.style.opacity=1
  }


}

export function hidePop(_id){
  const elScroll = document.querySelector(_id+' .pop_cnt_main');
  let $pop_contain, $pop_inner

  lenis.start();
  if(elScroll) elScroll.scrollTop = 0;
  $body.style.overflow = '';
  $body.style.paddingRight = '';
  $header.removeAttribute('style');
  // console.log(_id,elScroll)
  $pop_contain = document.querySelectorAll(_id);
  $body.classList.remove('show_pop');
  $pop_contain.forEach(_el => {
    $pop_inner = _el.querySelector('.pop_inner');
    _el.classList.remove('show');
    if($pop_inner.style){
      $pop_inner.style.opacity = 0;
    }
  });

}

window.showPopup = {init:showPop}