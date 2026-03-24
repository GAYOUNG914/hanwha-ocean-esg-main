import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {areaWidth} from "./common.js"

export function subKvInteraction(){

  // .sub_top에 top_img 있으면 아래 함수실행(이미지 있음)
  // top_img 없으면(텍스트만 있는 sub kv일 경우)실행 안함
  const findMainTagId = document.querySelector('main').getAttribute('id');
  const findoutSubKvHasImg = document.querySelector(`#${findMainTagId} .sub_top.top_img`);
  // const $thisPageID = document.querySelector(`#${findMainTagId}`)


  if(findoutSubKvHasImg){
    //이미지 인터랙션 있음
    init();
  }

  function setValue (startVal, endVal, proccess){
    return startVal + proccess * (endVal - startVal);
  }

  function init(){
    const $stickyTitle = document.querySelector(`#${findMainTagId} .top_tit_area.sticky`);
    const $overflowCT = document.querySelector(`#${findMainTagId} .main-inner .overflow-ct`);
    const $subKvImgWrap = document.querySelector(`#${findMainTagId} .main-inner .top_kv_area`);
    const $subKvImgPic = document.querySelector(`#${findMainTagId} .main-inner .top_kv_area .core-wrap`);
    const $subKvImgVid = document.querySelector(`#${findMainTagId} .main-inner .top_kv_area .video`);
    const $subKvImg = document.querySelector(`#${findMainTagId} .main-inner .top_kv_area .core-wrap-inner`);
    const video = document.querySelector(`#${findMainTagId} .main-inner .top_kv_area .video video`)
    const $subtextAbsol = document.querySelector(`#${findMainTagId} .main-inner .sub_top .top_tit-inner.absol`);
    const $subtextStatic = document.querySelector(`#${findMainTagId} .main-inner .sub_top .top_tit-inner.static`);
    let stickyTitleTop,imgOffsetTop,stickyTitleHeight,startWidthProp,endHeightVal;
    let isVidLoadCheck = false;

    if(video) video.load();
    $subtextAbsol.style.width = $subtextStatic.getBoundingClientRect().width + 'px';
    

      function scrollresize(){
        stickyTitleTop = $stickyTitle.getBoundingClientRect().top;
        imgOffsetTop = $subKvImgWrap.offsetTop;
        stickyTitleHeight = $stickyTitle.getBoundingClientRect().height;
        // $overflowCT.style.width = window.innerWidth + 'px';
        window.innerWidth < 769 ? startWidthProp = 0.8934 : startWidthProp = 0.8;
        // window.innerWidth < 769 ? endHeightVal = 65.6 : endHeightVal = 100;
        $subtextAbsol.style.width = $subtextStatic.getBoundingClientRect().width + 'px';
        endHeightVal = 100;
      }scrollresize();
    
      function scrollInit(){
        scrollresize();
        if(video) {
          video.addEventListener('canplaythrough', function() {
            isVidLoadCheck = true;
            video.play();
          });
        }
        let scrollTop = window.scrollY;
    
        const title = $stickyTitle.offsetTop;
        const imgTop = $subKvImgWrap.getBoundingClientRect().top + scrollTop;
    
        const imgTopStart = imgTop - stickyTitleHeight;
        const imgTopEnd = imgTop + stickyTitleHeight;
    
        const totalHeight = imgTop - stickyTitleTop;
        const clipTotalH = imgTopEnd - imgTopStart;
    
        const scrollProcess = title / totalHeight //타이틀이 이미지 내 상단에 붙었을 때 프로세스 100%;
        const imgProcess = scrollTop / imgTop;
        
        //img 스케일,w,h 키우기
        if( 0 <= imgProcess && imgProcess <= 1){
          $subKvImgPic.style.width = `${setValue(areaWidth * startWidthProp, areaWidth, imgProcess)}px`;

          if(window.innerWidth >= 769){
            $subKvImg.style.height = `${setValue(40.85, endHeightVal, imgProcess)}%`;
          }else{
            $subKvImg.style.height = `${setValue(116.8, 130.7, imgProcess)}vw`;
          }

        }else if(imgProcess > 1){
          // $subKvImgPic.style.width = `${document.body.scrollWidth}px`;
          $subKvImgPic.style.width = `${window.innerWidth}px`;

          if(window.innerWidth >= 769){
            $subKvImg.style.height = `${endHeightVal}%`;
          }else{
            $subKvImg.style.height = `130.7vw`;
          }
          
        }
        
        if($subKvImgVid && imgProcess > 1.7){
          if(isVidLoadCheck) video.pause();
          // $subKvImgVid.querySelector('video').pause();
        }else if($subKvImgVid && imgProcess <= 1.7 && imgProcess > 0){
          if($subKvImgVid){
            if(isVidLoadCheck) video.play();
            // $subKvImgVid.querySelector('video').play();
          }
        }
    
        if(scrollProcess >=0 && scrollProcess <= 1){
          //타이틀 클리핑
          const process = (-1 * (imgOffsetTop - title - stickyTitleHeight) / clipTotalH * 2) * 100;
          document.querySelector('.sub_top .top_tit-inner.absol').style.clipPath = `inset(0% 0% ${process}% 0%)`;

        }else if(scrollProcess >=1){
          document.querySelector('.sub_top .top_tit-inner.absol').style.clipPath = `inset(0% 0% 100% 0%)`;
        }else if(scrollProcess <= 0){
          document.querySelector('.sub_top .top_tit-inner.absol').style.clipPath = `inset(0% 0% 0% 0%)`;
        }
    
      }scrollInit();
    
      window.addEventListener('scroll', scrollInit);
      window.addEventListener('resize', scrollInit);
  }

}