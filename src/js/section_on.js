import * as state from './state';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { lenis } from "./smooth";
import {contentId, setSubTitBr} from './common';
import { CSSPlugin } from 'gsap';
let gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
TweenMaxWithCSS = gsapWithCSS.core.Tween;

export function sectionActive(_parent){
  const $parent = document.querySelector(`#${_parent}`);
  const $section = document.querySelectorAll(`#${_parent} section`);
  
  if($section){
    const $innerCopy = document.querySelectorAll(`#${_parent} section .in_sec_copy`);
    const $innerBoxArea = document.querySelectorAll(`#${_parent} section .in_sec_box_area`);
    const $innerBox = document.querySelectorAll(`#${_parent} section .in_sec_box`);
    let arrCopyPosTop = [];
    let arrBoxPosTop = [];

    arrCopyPosTop = []
    arrBoxPosTop = []
    $innerCopy.forEach((item) => {
      arrCopyPosTop.push(item.getBoundingClientRect().top);
    });
    $innerBoxArea.forEach((item) => {
      arrBoxPosTop.push(item.getBoundingClientRect().top);
    });

    // console.log('arrCopyPosTop',arrCopyPosTop)
    // console.log('arrBoxPosTop',arrBoxPosTop)

    state.on('scroll', function(scrollTop){
      let sTop = scrollTop;

      for (let i = 0; i < arrCopyPosTop.length; i++) {
        if (sTop > arrCopyPosTop[i] - window.innerHeight*0.8) {
          $innerCopy[i].classList.add('in_sec');
        }
      }
      for (let i = 0; i < arrBoxPosTop.length; i++) {
        if (sTop > arrBoxPosTop[i] - window.innerHeight*0.8) {
          $innerBoxArea[i].classList.add('in_sec');

          if($innerBoxArea[i].classList.contains('in_sec')){
            // setTimeout(function(){
            //   $innerBox[i].classList.add('in_sec');
            // },i*150)
            $innerBoxArea[i].childNodes.forEach((_el, _idx) => {
              if (_el.nodeType === 1 && _el.classList.contains('in_sec_box')) {
                setTimeout(function() {
                  _el.classList.add('in_sec');
                }, _idx * 125);
              }
            });
          }

        } 
      }
    })

  }
}

state.on('enter', () => {
  // page in check
  // console.log('enter::::',contentId)
	document.querySelector('main#'+contentId) && (() => {
    sectionActive(contentId)
    window.addEventListener('resize',()=>{
      sectionActive(contentId);
    })
  })();
});
