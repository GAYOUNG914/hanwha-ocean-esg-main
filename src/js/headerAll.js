import * as state from './state';
import { lenis } from "./smooth";
import { contentId, $header,activeIndex,media, $body, $gnb, $gnbDepth1, $btnAllMenu, $gnbDepth1Ul, $gnbShop, $footer, $main, isCheckHdType } from "./common";
import gsap from 'gsap';
import { isMobileOrTablet } from './util';

let lastScroll = document.documentElement.scrollTop || 0;
const $btnSubsidiary = document.querySelector('.btn-subsidiary_more');
const $subsidiaryList = document.querySelector('.f_subsidiary_list');
const $subsidiaryListUl = document.querySelector('.f_subsidiary_list ul');
const $schSelBtn = document.querySelector('#SCH .sel-btn');
const $schSelBox = document.querySelector('#SCH .c-sel');
const $schSelYear = document.querySelector('#SCH .c-sel .sel-year ul');
const $btnTop = document.querySelector('.btn_go_top');

let m_st =  window.pageXOffset || document.documentElement.scrollTop;
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
// vw 단위를 픽셀로 변환하기
let vwInPixels = viewportWidth * 0.01;
let liAllH = 0;

export function allMenuEvent(){
  // 메가메뉴 열기
  if(!$body.classList.contains('all_menu')){
    $body.classList.add('all_menu');
    $body.classList.remove('close_all_menu');
    $header.classList.remove('on');
    if(contentId !== 'MAIN') $header.classList.remove('noBgOn');
    lenis.stop();
    state.on('resize', function(){
      lenis.stop();
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      vwInPixels = viewportWidth * 0.01;
      liAllH=0
      $header.querySelectorAll('.d1').forEach((el,_idx) => {
        liAllH += el.offsetHeight + 10;
      })

      if(media !== 'desktop' || isMobileOrTablet){
        $gnbDepth1Ul.removeAttribute('style')
        $gnbDepth1.style.height = `${innerHeight - $header.querySelector('.header_wrap').offsetHeight}px`
      }else{
        // if($body.classList.contains('all_menu')){}
        // $gnbDepth1Ul.style.height = `${liAllH + Math.min(5.2083333333 * vwInPixels, 100)}px`;
        $gnbDepth1Ul.style.setProperty('--before-height', `${liAllH + Math.min(5.2083333333 * vwInPixels, 100)*2}px`);
        // $gnbDepth1Ul.style.overflowY = 'auto';
        $gnbDepth1.removeAttribute('style')
      }

    })
    document.querySelector('.pace').classList.add('p-hide');
    liAllH=0
    $header.querySelectorAll('.d1').forEach((el,_idx) => {
      liAllH += el.offsetHeight + Math.min(0.5208333333 * vwInPixels, 10);
      if (_idx === activeIndex) {
        el.classList.add('active');
        el.querySelector('.naviDepth1').classList.add('active');

        if(state.states.media !=='desktop' || isMobileOrTablet) gsap.to(el,{height:el.getBoundingClientRect().height+el.querySelector('.depth2_box').getBoundingClientRect().height})
        else el.style.removeProperty('height')
        
      } else {
        el.classList.remove('active');
        
        if(state.states.media !=='desktop' || isMobileOrTablet) gsap.to(el,{height:66})
        else el.style.removeProperty('height')
      }
    })
    setTimeout(() => {
      $gnbDepth1.classList.add('all_menu_grid');
      if(media === 'desktop' || !isMobileOrTablet){
        // $gnbDepth1Ul.style.height = `${liAllH + Math.min(5.2083333333 * vwInPixels, 100)}px`;
        $gnbDepth1Ul.style.setProperty('--before-height', `${liAllH + Math.min(5.2083333333 * vwInPixels, 100)*2}px`);
        // $gnbDepth1Ul.style.overflowY = 'auto';
        $gnbDepth1.removeAttribute('style')
      }else{
        
        $gnbDepth1.style.height = `${innerHeight - $header.querySelector('.header_wrap').offsetHeight}px`
      }
    }, 300);

  }else {
    // 메가메뉴 닫기
    $body.classList.remove('all_menu');
    $body.classList.add('close_all_menu');
    if(contentId !== 'MAIN') $header.classList.add('noBgOn');
    if(contentId == 'WWD') $header.classList.remove('noBgOn');
    if(contentId.indexOf('WWD-3d') > -1) $header.classList.remove('noBgOn');
    $gnbDepth1Ul.removeAttribute('style')
    $gnbDepth1.removeAttribute('style')
    state.on('resize', function(){
      lenis.start();
      $gnbDepth1Ul.removeAttribute('style')
    $gnbDepth1.removeAttribute('style')
    })
    if(m_st>0) {
      if(contentId.indexOf('WWD-3d') == -1) $header.classList.add('on');
    }else{
      $header.classList.remove('on');
    }
    setTimeout(() => {
      $gnbDepth1.classList.remove('all_menu_grid')
    }, 300);
    document.querySelector('.pace').classList.remove('p-hide');
    
    lenis.start();
    $header.querySelectorAll('.d1').forEach((el,_idx) => {
      el.classList.remove('active');
      if(activeIndex == null || activeIndex =='null') el.querySelector('.naviDepth1').classList.remove('active');
      
      if(state.states.media !=='desktop') gsap.to(el,{height:66})
      else el.style.removeProperty('height')
      
    })

  }
}

export function headerAll() {
  if(contentId !== 'MAIN') $header.classList.add('noBgOn');  
  else $header.classList.add('main_ver')


  state.on('scroll', function(){
    
    m_st =  parseInt(document.documentElement.scrollTop);
    
    if(!$body.classList.contains('all_menu')){
      if(m_st > lastScroll){ 
        // scroll down
        if(!$header.classList.contains('gnb_enter')){
          if(m_st>100){
            document.querySelector('.pace') && document.querySelector('.pace').classList.add('p-hide');
            if ( !isCheckHdType ) $header.classList.add('on');
            $header.classList.add('fix');
          }
        }
      }
      if(m_st < lastScroll){ 
        // scroll up
        $header.classList.remove('fix');
        document.querySelector('.pace') && document.querySelector('.pace').classList.remove('p-hide');
        if(m_st<=0) {
          $header.classList.remove('on');
          if(contentId !== 'MAIN' && $main.dataset.hdType !== 'wh') $header.classList.add('noBgOn');

        }
      }
    }
    lastScroll = m_st <= 0 ? 0 : m_st;;
  });  

  /* depth1 mouse enter */
  let $currentD1;
  let resizeTimer;

  function eventMouseOver(){
    if(!$body.classList.contains('all_menu')&& window.innerWidth >= 1024){
      if(!$header.classList.contains('gnb_enter')){
        $header.classList.add('gnb_enter');
        $gnbDepth1Ul.classList.add('over');
      }
      $currentD1 && $currentD1.classList.remove('is-hover');   
      this.classList.add('is-hover');
      $currentD1 = this;
    }else{
      return
    }
  }

  function preventLinkClick(e) {
    if (e.target.classList.contains('naviDepth1')) {
      e.preventDefault();
      if(!e.target.parentNode.classList.contains('active')){
        e.target.parentNode.classList.add('active');
        // console.log(e.target.parentNode.offsetHeight,e.target.parentNode.getBoundingClientRect().height)
        gsap.to(e.target.parentNode,{height:e.target.parentNode.getBoundingClientRect().height + e.target.parentNode.querySelector('.depth2_box').getBoundingClientRect().height})
      }else{
        gsap.to(e.target.parentNode,{height:`66px`,onStart:function(){
          e.target.parentNode.classList.remove('active');
        }})
        return
      }
      
    }
  }

  function eventResize(){
    lenis.stop()
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth < 1024 || isMobileOrTablet) {
        document.addEventListener('click', preventLinkClick);
      } else {
        document.removeEventListener('click', preventLinkClick);
        $header.querySelectorAll('.d1').forEach(el => {
          if(state.states.media !=='desktop') gsap.to(el,{height:el.getBoundingClientRect().height+el.querySelector('.depth2_box').getBoundingClientRect().height})
          else el.style.removeProperty('height')
        })
      }
    }, 300); 
    lenis.resize()
    lenis.start();
  }

  if(!$header.classList.contains('in-tablet')){
    $header.querySelectorAll('.d1').forEach(el => {
      el.addEventListener('mouseover',eventMouseOver);
    });
  }

  if (window.innerWidth < 1024) {
    document.addEventListener('click', preventLinkClick);
  } else {
    document.removeEventListener('click', preventLinkClick);
    $header.querySelectorAll('.d1').forEach(el => {
      if(state.states.media !=='desktop') gsap.to(el,{height:el.getBoundingClientRect().height+el.querySelector('.depth2_box').getBoundingClientRect().height})
      else el.style.removeProperty('height')
    })
  }

  // window.addEventListener('resize',eventResize);
  state.on('resize', eventResize)


  document.querySelector('.depth1_ul').addEventListener('mouseleave',() => {
    if(!$body.classList.contains('all_menu')){
      $gnbDepth1Ul.classList.remove('over');
      $header.classList.remove('gnb_enter');
      $currentD1 && $currentD1.classList.remove('is-hover');
    }else{
      return
    }
  });


  /* other_services */
  $btnAllMenu.addEventListener('click',allMenuEvent);

}

export function footerAll() {

  // btn 계열사
  $btnSubsidiary.addEventListener('click', () => {
    if($subsidiaryList.classList.contains('on')){ 
      $btnSubsidiary.classList.remove('on');
      $subsidiaryList.classList.remove('on');
      $subsidiaryListUl.scrollTop = 0;
    }else {
      $btnSubsidiary.classList.add('on');
      $subsidiaryList.classList.add('on');
    }
  });

  //btn top
  $btnTop.addEventListener('click', () => {
    // lenis.scrollTo(0);
    // window.scrollTo(0,1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
    $btnSubsidiary.classList.remove('on');
    $subsidiaryList.classList.remove('on');
    $subsidiaryListUl.scrollTop = 0;
  });

  // 계열사 영역 외 클릭시
  document.addEventListener('click', function(event) {

    let target = event.target;


    // sch & cu20 페이지 별도 분기 처리
    if($main.classList.contains('sch') || $main.classList.contains('cu20')){

      const $schSelBtn = document.querySelector(`#${$main.id} .sel-btn`);
      const $schSelBox = document.querySelector(`#${$main.id} .c-sel`);
      const $schSelYear = document.querySelector(`#${$main.id}  .c-sel .sel-year ul`);

      if($schSelBtn && $schSelBox ){
        if (!$schSelBtn.contains(target) && !$schSelBox.contains(target)){
          if($schSelBtn.classList.contains('on')){
            $schSelBtn.classList.remove('on');
            $schSelBox.classList.remove('on');
            $schSelYear.scrollTop = 0;
          }
        }
      }
    }


    if (!$subsidiaryList.contains(target) && !$btnSubsidiary.contains(target)) {
      if($subsidiaryList.classList.contains('on')){ 
        $btnSubsidiary.classList.remove('on');
        $subsidiaryList.classList.remove('on');
        $subsidiaryListUl.scrollTop = 0;
      }
    }
    if($header.classList.contains('gnb_enter')) $header.classList.remove('gnb_enter');
  });
}