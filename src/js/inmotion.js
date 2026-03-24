import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { contentId } from "./common";

if(contentId !== 'MAIN'){
  gsap.registerPlugin(ScrollTrigger);

  const subInMotion = (() => {
    console.log("%c ::::::::::::::::::::subInMotion:::::::::::::::::::","color:black;background:white");
    const $parent = document.querySelector('main');
    const $mSecInMotion = document.querySelectorAll('.m_scroll_motion_el');

    window.addEventListener("scroll", function(){
      // console.log('nseseseeesese')
      // var m_$scrollSection = $(".common_scroll_motion_section"),
      let m_st = window.screenY,
          m_gap = window.innerHeight-150;

      for(var i = 0, len = g_scrollSectionLen; i < len; ++i){
         let m_$currentSection = $mSecInMotion.eq(i)
      //     var m_$currentSection = m_$scrollSection.eq(i),
      //         m_offsetTop = m_$currentSection.offset().top;

      //     if(m_st+m_gap > m_offsetTop) m_$currentSection.addClass("on");
      }
  })
  window.dispatchEvent( new Event('scroll') );


    
    const init = () => {

    }

      // init()


  })();
}