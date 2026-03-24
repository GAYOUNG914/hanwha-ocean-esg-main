import * as state from './state';
import {contentId, language, scrollTop,contentHeight, areaHeight,$body, $footer, $html, $header } from './common';
import gsap from 'gsap';
import {addZero, isMobile} from './util'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { lenis } from "./smooth";
import {mainZoominInit} from "./_main-zoomin"
import {parallax} from "./_parallax"
import {media} from "./_main-media"
import { layerPopup } from './_main-layer-popup';
import {odometerBase} from './odometer';
import { odometerInit } from './odometerInit';
import { accordion } from './accordion.js';
import Swiper from 'swiper';
import { Mousewheel, Pagination } from 'swiper/modules';
Swiper.use([Mousewheel, Pagination ]);
import 'swiper/scss';

let nowState = state.states.media;
const $mainSideScrollImg = document.querySelectorAll('section#MAIN_SIDESCROLL .mainsidescroll-img-wrap');
const $sideScrollSection = document.querySelector('section#MAIN_SIDESCROLL .sec_inner');


function isTouchDevice() {
  return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
}
if(document.querySelector('main#MAIN')){
  if (isTouchDevice()) {
    $sideScrollSection.style.height = `130vh`;
  } else {
    $sideScrollSection.style.height = `330vh`;
  }
}

function mainHightLight2023Init(){
  if (document.querySelector('#HIGHLIGHT2023 .common-accordion-list')) {
    const $accordion = document.querySelector('#HIGHLIGHT2023 .common-accordion-list');
    new accordion({ accordionElem: $accordion })
  }
  
}mainHightLight2023Init();

function mainSustainabiltiyInit(){
  const $susforMain = document.querySelectorAll('#SUSTAINABILITY') ?  document.querySelectorAll('#SUSTAINABILITY') : null;
  const $susSection = document.querySelector('#MAIN #SUSTAINABILITY');

  if ($susforMain && document.querySelector('#MAIN') && $susforMain.length >= 1){
   $susforMain[0].remove(); //메인의 플로팅 삭제
  }

  if($susSection){
  $susSection.querySelector('h2.m_h4').classList.add('txt_ef_up','in_sec_copy');
  $susSection.querySelector('.desc-text').classList.add('txt_ef_up','in_sec_copy');
  $susSection.querySelector('.picture').classList.add('in_sec_copy');    
  }

}mainSustainabiltiyInit();


state.on('enter', () => {
  // page in check
	document.querySelector('main#MAIN') && (() => {
    nowState = state.states.media;
    lenis.scrollTo(0);
    window.scrollTo(0,1);

    odometerBase();
    gsap.registerPlugin(ScrollTrigger);

    layerPopup();
    mainZoominInit();
    parallax(document.querySelector('#KV01 .bg-img.picture img'), -20);
    parallax(document.querySelector('#KV01 .cloud-img.right-1 img'), 45);
    parallax(document.querySelector('#KV01 .cloud-img.left img'), 40);
    parallax(document.querySelector('#KV01 .cloud-img.bottom img'), 40);
    media();

    //=============== main ===============
    function KV01Init(){
      const $secInner = document.querySelector('#KV01 .sec_inner');
      const $textWraps = document.querySelectorAll('#KV01 .text-wrap-inner');
      let secInnerTop,secInnerHeight;

      function kvTextInit(){
        for(let a of $textWraps){
          a.classList.remove('active');
        }
        if(!$textWraps[0].classList.contains('active')){
          setTimeout(()=>{
            $textWraps[0].classList.add('active');
          },1000);
        }
      }
      kvTextInit();


      if($textWraps[0].classList.contains('active') && $textWraps[1].classList.contains('active')){
        kvTextInit();
      }



      function KV01scrollinit(){
        secInnerTop = $secInner.getBoundingClientRect().top;
        secInnerHeight = $secInner.getBoundingClientRect().height;
        let percent = -secInnerTop/ (secInnerHeight - window.innerHeight);

        if(percent > 0.4 && !$textWraps[1].classList.contains('active')){
          for(let a of $textWraps){
            a.classList.remove('active');
          }
          setTimeout(()=>{
            $textWraps[1].classList.add('active');
          },300);
        }else if(percent <= 0.4 && $textWraps[1].classList.contains('active')){
          for(let a of $textWraps){
            a.classList.remove('active');
          }
          setTimeout(()=>{
            $textWraps[0].classList.add('active');
          },300);
        }
      }KV01scrollinit();

      window.addEventListener('resize',KV01scrollinit);

      window.addEventListener('scroll', ()=>{
        KV01scrollinit();
      });

    }KV01Init(); 

    let ismoving1 = false;
    let ismoving2 = false;
    let ismoving3 = false;

    let isFalse = false;

    function mainHSEInit(){
      const $secInner = document.querySelector('#MAIN_HSE .sec_inner');
      const $bgSections = document.querySelectorAll('#MAIN_HSE .bg-wrap-inner');
      const $bgSectiontexts = document.querySelectorAll('#MAIN_HSE .bg-wrap-inner .bg-text-wrap');
    
      let secInnerTop,secInnerHeight;
      let winH = window.innerHeight;

      function mainHSEscroll(){
        secInnerTop = $secInner.getBoundingClientRect().top;
        secInnerHeight = $secInner.getBoundingClientRect().height;
        let percent = -secInnerTop/ (secInnerHeight - window.innerHeight);

        let odometer01 = $bgSectiontexts[0].querySelector('.common-odometer');
        let odometer02 = $bgSectiontexts[1].querySelector('.common-odometer');
        let odometer03 = $bgSectiontexts[2].querySelector('.common-odometer');

        let scrollY = window.scrollY;

        let firstPhase = 0.3;
        let secondPhase = 0.6;


        for(let a of $bgSections){
          a.classList.remove('active');
        }
        for(let a of $bgSectiontexts){
          a.classList.remove('on');
        }

        if(percent <= -0.2 ){
          ismoving1 = false;
          // odometerInit(odometer01,false); 
        }

        if(percent > -0.2 && percent <= firstPhase){

          ismoving2 = false;
          // ismoving3 = false;

          $bgSections[0].classList.add('active');
          $bgSections[1].classList.remove('active');
          $bgSectiontexts[0].classList.add('on');
          $bgSectiontexts[1].classList.remove('on');

          if(!ismoving1){
            odometerInit(odometer01,false); 
            setTimeout(()=>{
              odometerInit(odometer01,true); 
            },100)

            ismoving1 = true;
          }

          // odometerInit(odometer02,false); 

        }else if(percent > firstPhase && percent <= secondPhase){

          ismoving1 = false;
          ismoving3 = false;

          $bgSections[1].classList.add('active');
          $bgSections[2].classList.remove('active');
          $bgSectiontexts[0].classList.remove('on');
          $bgSectiontexts[1].classList.add('on');
          $bgSectiontexts[2].classList.remove('on');

          if(!ismoving2){
            setTimeout(()=>{
              odometerInit(odometer02,true); 
            },100)

            lenis.stop();
            
            setTimeout(()=>{
              lenis.start();
            },300)
            ismoving2 = true;
          }

          odometerInit(odometer03,false); 

        }else if(percent > secondPhase && percent <= 1){

          // ismoving1 = false;
          ismoving2 = false;

          $bgSections[2].classList.add('active');
          $bgSectiontexts[1].classList.remove('on');
          $bgSectiontexts[2].classList.add('on');
          
          if(!ismoving3){
            setTimeout(()=>{
              odometerInit(odometer03,false); 
              odometerInit(odometer03,true); 
            },100)
            
            lenis.stop();
            
            setTimeout(()=>{
              lenis.start();
            },300)
            ismoving3 = true;
          }

        }

        if(percent > 1 ){
          ismoving3 = false;
        }

        if(percent >= 0 && percent <= 1){
          function detectAddressBarMo(){
            let newWinH = window.innerHeight;
    
            if(winH > newWinH){
              // console.log('주소창 나타남')
              for(let a of $bgSectiontexts){
                a.style.transform = 'translateY(-80px)';
              }
              winH = newWinH;
            }
    
            if(winH < newWinH){
              // console.log('주소창 들어감')
              for(let a of $bgSectiontexts){
                a.style.transform = 'translateY(0)';
              }
              winH = newWinH;
            }
            
          }detectAddressBarMo();
        }


      }mainHSEscroll();

      window.addEventListener('resize',()=>{
        mainHSEscroll();
        // detectAddressBarMo();
      });

      window.addEventListener('scroll', ()=>{
        mainHSEscroll();
      });

    }mainHSEInit();

      let sidescrollSwiper;
      let isScrolling = false;
      const swiperSection = document.querySelector('#MAIN_SIDESCROLL .swiper-container');
      const swiperSectionTextWrap = document.querySelector('#MAIN_SIDESCROLL .sidescroll-textwrap');
      const textWraps = document.querySelectorAll('#MAIN_SIDESCROLL .slide-text-wrap');
      const swiperSlides = document.querySelectorAll('#MAIN_SIDESCROLL .swiper-slide');
      const swiperAcc = document.querySelector('#MAIN_SIDESCROLL .swiper-acc');

      function initSideScrollSwiper() {

        sidescrollSwiper = new Swiper('#MAIN_SIDESCROLL .swiper-container', {
              direction: 'horizontal',
              slidesPerView: 1.5,
              centeredSlides: true,
              spaceBetween: 0,
              threshold: isTouchDevice() ? 5 : 100,
              touchRatio: isTouchDevice() ? 1 : 0.5,
              mousewheel: isTouchDevice() ? false :{
                enabled: true,
                sensitivity: 0.05, // 마우스휠 감도 설정
                thresholdDelta: 20, // 슬라이드 전환을 위한 휠 델타 임계값
                thresholdTime: 200, // 연속 휠 이벤트 간의 시간 간격 (ms)
                eventsTarget: '#MAIN_SIDESCROLL', // 마우스휠 이벤트를 감지할 요소
              },
              keyboard: true,
              pagination: {
                el: "#MAIN_SIDESCROLL .swiper-pagination",
                clickable: true,
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                  return '<span class="' + currentClass + '"></span>' +
                        ' / ' +
                        '<span class="' + totalClass + '"></span>';
                },
                formatFractionCurrent: function (number) {
                  return ('0' + number).slice(-2);
                },
                formatFractionTotal: function (number) {
                  return ('0' + number).slice(-2);
                }
              },
              navigation: {
                nextEl: "#MAIN_SIDESCROLL .swiper-button-next",
                prevEl: "#MAIN_SIDESCROLL .swiper-button-prev",
              },
          });
          sidescrollSwiper.enable();
          swiperAcc.classList.add('active');
          textWraps[0].classList.add('active');
          swiperSectionTextWrap.classList.contains('scroll-active') && swiperSectionTextWrap.classList.remove('scroll-active');
          if(swiperSectionTextWrap.getBoundingClientRect().height < textWraps[0].getBoundingClientRect().height){
            swiperSectionTextWrap.classList.add('scroll-active'); 
          }


          sidescrollSwiper.on('reachBeginning', function() {
              isScrolling = false;
          });

          sidescrollSwiper.on('reachEnd', function() {
              isScrolling = false;
          });

          sidescrollSwiper.on('slideChange', function () {
            const activeIndex = sidescrollSwiper.activeIndex;
            
            //텍스트 active 초기화
            textWraps.forEach(wrap => wrap.classList.remove('active'));
            //텍스트 스크롤 초기화
            swiperSectionTextWrap.classList.contains('scroll-active') && swiperSectionTextWrap.classList.remove('scroll-active');
            //스크롤을 탑 0으로 초기화
            for(let a of swiperSectionTextWrap.querySelectorAll('.inner')){
              a.scroll({
                top: 0,
                behavior: 'smooth'
              });
            }
            
            if (textWraps[activeIndex]) {
              textWraps[activeIndex].classList.add('active');

              if(swiperSectionTextWrap.getBoundingClientRect().height < textWraps[activeIndex].getBoundingClientRect().height){
                swiperSectionTextWrap.classList.add('scroll-active'); 
              }

            }

            if(window.innerWidth >= 769){
              if(activeIndex == 1 && !isTouchDevice()){
                lenis.stop();
              }
              if(activeIndex == swiperSlides.length - 1 || activeIndex == 0){
                setTimeout(()=>{
                  lenis.start();
                },300)                
              }
            } 

          });
      }
      
      function destroySideScrollSwiper() {
        if (sidescrollSwiper !== undefined) {
          textWraps.forEach(wrap => wrap.classList.remove('active'));
            sidescrollSwiper.destroy(true, true);
            sidescrollSwiper = undefined;
            swiperAcc.classList.remove('active');
            // console.log('destroy')
        }
      }

      function reinitSwiper() {
        destroySideScrollSwiper();
        initSideScrollSwiper();
        // console.log('restart')
      }

      function handleScroll(event) {
          const rect = swiperSection.getBoundingClientRect();
          
          if (rect.top <= 0 && rect.bottom > window.innerHeight) {
              isScrolling = true;
          } else {
              isScrolling = false;
          }

          if (isScrolling) {
              event.preventDefault();
          }
      }

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('wheel', handleScroll, { passive: false });

      function mainClipInit() {
      const $secInner = document.querySelector('#MAIN_CLIP .sec_inner');
      const $imgWrap = document.querySelector('#MAIN_CLIP .sec_inner .mainclip-img-wrap');
      const $imgWrapImg = $imgWrap.querySelector('img');
      const $mainHSE = document.querySelector('#MAIN_HSE');
      const $mainSideScroll = document.querySelector('#MAIN_SIDESCROLL');

    
      let clientWidth = document.documentElement.clientWidth;
      let clientHeight = document.documentElement.clientHeight;
      let standardLength = Math.max(clientWidth, clientHeight);

      let sideScrollImgRect = $mainSideScrollImg[0].getBoundingClientRect();
      let SwiperPaddingTop = parseFloat(window.getComputedStyle($mainSideScroll.querySelector('.swiper-container')).paddingTop);
      let wrapImgHeightDiff = ($mainSideScroll.querySelectorAll('.swiper-slide')[0].getBoundingClientRect().height - sideScrollImgRect.height) / 2;
    
      gsap.registerPlugin(ScrollTrigger);
    
      const clipSecVal = {
        FirstSTART: 0.2,
        SecondSTART: 0.6,
        imgWrap: {
          W_Start: standardLength * 1.5,
          W_Half: standardLength * 0.75,
          W_End: sideScrollImgRect.height,

          H_Start: standardLength * 1.5,
          H_Half: standardLength * 0.75,
          H_End: sideScrollImgRect.height,
        },
        imgWrapImg: {
          W_Start: standardLength * 2,
          W_Half: standardLength * 1.8,
          W_End: state.states.media !== 'mobile' ? Math.min(clientWidth * 0.591145833, 1135) : 300, //고정
          X_Percent: state.states.media === 'mobile' ? 3.4 : 2.6,      

          H_Start: standardLength * 2* 0.591145833,
          H_Half: standardLength * 1.8* 0.591145833,
          H_End: sideScrollImgRect.height, //고정
          Y_Percent: state.states.media === 'mobile' ? 0.3 : 0.3,
        },
      };

      gsap.set($imgWrap,{
        width: standardLength * 1.5 + 'px',
        height: standardLength * 1.5 + 'px',
      })

      gsap.set($imgWrapImg,{
        width: standardLength * 2 + 'px',
        height: standardLength * 2 * 0.591145833 + 'px',
      })

    
      // GSAP 애니메이션 타임라인 생성
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: $secInner,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          // markers: true,
          onEnter: () => {
                // console.log('start')
                // $imgWrap.style.clipPath = 'circle(50% at 50% 50%)';
                $secInner.classList.remove('active');
                document.querySelector('#MAIN_HSE').style.opacity = 1;
                $imgWrap.style.width = clipSecVal.imgWrap.W_Start + 'px';
                $imgWrap.style.height = clipSecVal.imgWrap.H_Start + 'px';
                $imgWrap.querySelector('img').style.width = clipSecVal.imgWrapImg.W_Start + 'px';
                $imgWrap.querySelector('img').style.height = clipSecVal.imgWrapImg.H_Start + 'px';              

                destroySideScrollSwiper();
                document.querySelector('#MAIN_SIDESCROLL').style.visibility = 'hidden';
                textWraps[0].classList.add('active');
          },
          onUpdate: (self) => {
              // const progress = self.progress;
              // $imgWrap.style.clipPath = `circle(50% at 50% 50%)`;
              if (document.querySelector('#MAIN_SIDESCROLL').style.visibility == 'hidden'){
                $secInner.classList.add('active');
                $mainHSE.style.opacity = 0;
                document.querySelector('#MAIN_CLIP').style.visibility = 'visible';        
              }
              
              if(state.states.media === 'mobile' && $imgWrap.offsetTop > $mainSideScrollImg[0].offsetTop){
                let diffY = SwiperPaddingTop +  wrapImgHeightDiff - $imgWrap.offsetTop;
                gsap.to($imgWrap, {
                  y: `${diffY}px`
                })
              }

          },
          onLeave: () => {
              // console.log('done')
              if(!sidescrollSwiper){
                initSideScrollSwiper();
                document.querySelector('#MAIN_SIDESCROLL').style.visibility = 'visible';
                document.querySelector('#MAIN_SIDESCROLL .title-eyebrow').classList.add('active');
                document.querySelector('#MAIN_CLIP').style.visibility = 'hidden';
              }              
          },
          onEnterBack: () => {
            if(sidescrollSwiper){
              $secInner.classList.add('active');
              destroySideScrollSwiper();
              document.querySelector('#MAIN_SIDESCROLL').style.visibility = 'hidden';
              document.querySelector('#MAIN_SIDESCROLL .title-eyebrow').classList.remove('active'); 
              document.querySelector('#MAIN_CLIP').style.visibility = 'visible';      
            }
          },
          onLeaveBack: () => {
            $secInner.classList.remove('active');
            document.querySelector('#MAIN_HSE').style.opacity = 1;
            $imgWrap.style.width = clipSecVal.imgWrap.W_Start + 'px';
            $imgWrap.style.height = clipSecVal.imgWrap.H_Start + 'px';
            $imgWrap.querySelector('img').style.width = clipSecVal.imgWrapImg.W_Start + 'px';
            $imgWrap.querySelector('img').style.height = clipSecVal.imgWrapImg.H_Start + 'px';   
          },
        }
      });


      tl.to($imgWrap, {
        width: clipSecVal.imgWrap.W_Half,
        height: clipSecVal.imgWrap.H_Half,
        ease: "none",
        duration: clipSecVal.SecondSTART - clipSecVal.FirstSTART,
        // clipPath: 'circle(50% at 50% 50%)',
      }, clipSecVal.FirstSTART)
      .to($imgWrapImg, {
        width: clipSecVal.imgWrapImg.W_Half,
        height: clipSecVal.imgWrapImg.H_Half,
        ease: "none",
        duration: clipSecVal.SecondSTART - clipSecVal.FirstSTART,
      }, clipSecVal.FirstSTART);

      tl.to($imgWrap, {
        width: clipSecVal.imgWrap.W_End,
        height: clipSecVal.imgWrap.H_End,
        ease: "none",
        duration: 1 - clipSecVal.SecondSTART,
        // duration: clipSecVal.SecondSTART - clipSecVal.FirstSTART,
        clipPath: `circle(50% at 50% 50%)`,
      }, clipSecVal.SecondSTART)
      .to($imgWrapImg, {
        width: clipSecVal.imgWrapImg.W_End,
        height: clipSecVal.imgWrapImg.H_End,
        xPercent: clipSecVal.imgWrapImg.X_Percent,
        yPercent: clipSecVal.imgWrapImg.Y_Percent,
        ease: "none",
        duration: clipSecVal.SecondSTART - clipSecVal.FirstSTART,
      }, clipSecVal.SecondSTART);


    
      // Resize handler
      const resizeHandler = () => {
        clientWidth = document.documentElement.clientWidth;
        clientHeight = document.documentElement.clientHeight;
        standardLength = Math.max(clientWidth, clientHeight);
        sideScrollImgRect = $mainSideScrollImg[0].getBoundingClientRect();
        SwiperPaddingTop = parseFloat(window.getComputedStyle($mainSideScroll.querySelector('.swiper-container')).paddingTop);
        wrapImgHeightDiff = ($mainSideScroll.querySelectorAll('.swiper-slide')[0].getBoundingClientRect().height - $mainSideScrollImg[0].getBoundingClientRect().height) / 2;
    
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      };
    
      window.addEventListener('resize', resizeHandler);

    
      // Cleanup function
      return () => {
        window.removeEventListener('resize', resizeHandler);
        tl.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
      }

      // Initialize
      const cleanupClipFunc = mainClipInit();

      // Cleanup on page transition
      state.on('leave', cleanupClipFunc); 
      
      // -----------------------------------gsap test done


      function mainSideScrollInit(){
        const $secInner = document.querySelector('#MAIN_SIDESCROLL .sec_inner');
        let secInnerTop,secInnerHeight;

        function swiperAccPadding(){
          document.querySelector('section#MAIN_SIDESCROLL .sticky-section .swiper-container .swiper-acc').style.transform 
          = `translateY(${-1 * parseFloat(window.getComputedStyle(document.querySelector('#MAIN_SIDESCROLL .swiper-container')).paddingTop)}px)`;
        }swiperAccPadding();
  
        function mainSideScroll(){
          secInnerTop = $secInner.getBoundingClientRect().top;
          secInnerHeight = $secInner.getBoundingClientRect().height;
          let percent = -secInnerTop/ (secInnerHeight - window.innerHeight);

          if(sidescrollSwiper && !isTouchDevice()){
            if(0 <= percent && percent < 1 && !sidescrollSwiper.enabled){
                sidescrollSwiper.enable();
                swiperAcc.classList.add('active');
            }else if(1 <= percent && sidescrollSwiper.enabled){
                sidescrollSwiper.disable();
                swiperAcc.classList.remove('active');
            }
          }
  
        }mainSideScroll();        
  
        
        window.addEventListener('resize',()=>{
          mainSideScroll();
          swiperAccPadding();
        });
  
        window.addEventListener('scroll', ()=>{
          mainSideScroll();
        });
      }mainSideScrollInit();


    // //===============main===============

    let resizeTimer;
    window.addEventListener('resize', function() {
      if(nowState !== state.states.media){

        if(state.states.media === 'desktop'){
          nowState = state.states.media
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            window.location.href = window.location.href;
          }, 300);
        }else if(state.states.media === 'tablet'){
          nowState = state.states.media
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            window.location.href = window.location.href;
          }, 300);
  
        }else if(state.states.media === 'mobile'){
          nowState = state.states.media
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            window.location.href = window.location.href;
          }, 300);
        }
      }
    });
    window.addEventListener("orientationchange", function() {
      if (window.orientation === 0 || window.orientation === 0) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          window.location.href = window.location.href;
        }, 300);
      }
    });

  

    // page out check
		state.on('leave', () => {
			// console.log('_main leave');
		});
	})();
});