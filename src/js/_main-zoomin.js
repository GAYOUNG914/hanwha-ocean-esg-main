import * as state from './state';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap';

let gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
TweenMaxWithCSS = gsapWithCSS.core.Tween;

export function mainZoominInit(){
  const $zoomInSections = document.querySelectorAll(".sec_zoomin")

  for(let $zoomInSec of $zoomInSections){
    
    const parallaxCt = $zoomInSec.querySelector(".zoomin-inner")
  
    const textOcean = $zoomInSec.querySelector('.sec_inner .title-video');
    const textOceanstrong = $zoomInSec.querySelectorAll('.sec_inner .title-video span strong');
    const textEyebrow = $zoomInSec.querySelector(".title-wrap .title-eyebrow")
    const text1 = $zoomInSec.querySelectorAll(".title-wrap .text1")
    const text1dash1 = $zoomInSec.querySelectorAll(".title-wrap .text1-1")
    const text1dash2 = $zoomInSec.querySelectorAll(".title-wrap .text1-2") ? $zoomInSec.querySelectorAll(".title-wrap .text1-2") : null
    const text1dash3 = $zoomInSec.querySelectorAll(".title-wrap .text1-3") ? $zoomInSec.querySelectorAll(".title-wrap .text1-3") : null
    const videoCont = $zoomInSec.querySelector('.vid-container')
    const videowrap = $zoomInSec.querySelector(".video-wrap") ? $zoomInSec.querySelector(".video-wrap") : null;
    const video = $zoomInSec.querySelector(".video-wrap video") ? $zoomInSec.querySelector(".video-wrap video") :  $zoomInSec.querySelector(".img-wrap img");
    const titleKR = $zoomInSec.querySelector(".title-kr")
    let isVidLoadCheck = false;
    gsapWithCSS.registerPlugin(ScrollTrigger);
    let videoContW , videoContH, videoGap, videoContL, videoContT;
    let viewportWidth = window.innerWidth;
    // vw 단위를 픽셀로 변환하기
    let vwInPixels = viewportWidth * 0.01;
    let playVideo,pauseVideo = null;
    
    function init(){
      if(videowrap)video.load();
      
      bindMarkupGsap();
    }
    const bindMarkupGsap = function(){
      
      let mainZoomInTimeline =  gsap.timeline();
  
        video.addEventListener('canplaythrough', function() {
          isVidLoadCheck = true;
        });
        playVideo = () => {
          if(isVidLoadCheck) video.play();
        };
        pauseVideo = () => {
          if(isVidLoadCheck) video.pause();
        };
  
      //text timeline
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxCt,
          start: "top 60% top", 
          end: "top 10% top", 
          scrub: 1,
          // scrub: true,
          // markers:true,
          onEnter: function(){
          
          },
          onEnterBack: pauseVideo,
          onLeaveBack: pauseVideo,
        }
      });

      titleTl.fromTo(textEyebrow.querySelector('strong'),{
        opacity:"0%",
        y:`100%`
      },{
        opacity:"100%",
        y:`0`,
        duration: 1, // 애니메이션 지속 시간
        ease: "power2.out" // 부드러운 이징 함수
      })
  
      for(let a of text1){
        titleTl.fromTo(a.querySelector('strong'),{
          opacity:"0%",
          y:`100%`
        },{
          opacity:"100%",
          y:`0`,
          duration: 1, // 애니메이션 지속 시간
          ease: "power2.out" // 부드러운 이징 함수
        })
      }

        for(let a of text1dash1){
          titleTl.fromTo(a.querySelector('strong'),{
            opacity:"0%",
            y:`100%`
          },{
            opacity:"100%",
            y:`0`,
            duration: 1, // 애니메이션 지속 시간
            ease: "power2.out" // 부드러운 이징 함수
          })
          // .fromTo(video,{
          //   opacity:"0%",
          //   y:`120%`
          // },{
          //   opacity:"100%",
          //   y:`0`
          // },'-=0.5')
        }
  

        if(text1dash2){
          for(let a of text1dash2){
            titleTl.fromTo(a.querySelector('strong'),{
              opacity:"0%",
              y:`100%`
            },{
              opacity:"100%",
              y:`0`,
              duration: 1, // 애니메이션 지속 시간
              ease: "power2.out" // 부드러운 이징 함수
            })
          }
        }

        if(text1dash3){
          for(let a of text1dash3){
            titleTl.fromTo(a.querySelector('strong'),{
              opacity:"0%",
              y:`100%`
            },{
              opacity:"100%",
              y:`0`,
              duration: 1, // 애니메이션 지속 시간
              ease: "power2.out" // 부드러운 이징 함수
            })
          }
        }

        titleTl.fromTo(video,{
          opacity:"0%",
          y:`100%`
        },{
          opacity:"100%",
          y:`0`,
          duration: 2, // 애니메이션 지속 시간
          ease: "power2.out" // 부드러운 이징 함수
        })
  
        mainZoomInTimeline.fromTo(titleKR,{
          opacity:"0%",
          y:`10%`,
          pointerEvents: "none",
          visibility: "hidden", 
        },{
          opacity:"100%",
          y:`0%`,
          pointerEvents: "all",
          visibility : "visible"
          // ease:"Power1.easeInOut"
        }, 0)

        // 위치조정
        state.on('resize', function(){
           viewportWidth = window.innerWidth;
           vwInPixels = viewportWidth * 0.01;
          if(state.states.media === 'desktop'){
            videoContW = Math.min(30.9375 * vwInPixels, 594);
            videoContH = Math.min(16.9270833333 * vwInPixels, 325);
            videoContL = textOcean.offsetLeft ;
            videoContT = Math.min(30.2083333333 * vwInPixels,580);
          }else if(state.states.media === 'tablet'){
            videoContW = 374;
            videoContH = 204;
            videoContL = textOcean.offsetLeft;
            videoContT = 366;
          }else{
            videoContW = 288;
            videoContH = 163;
            videoContL = 20;
            videoContT = 286;
          }
          // gsapWithCSS.set(videoCont, {
          //   width:videoContW,
          //   height:videoContH,
          //   left:videoContL,
          //   top:videoContT,
          //   // opacity:0
          // });
  
        })



        ScrollTrigger.create({
          trigger:$zoomInSec,
          start: "0 center", 
          end:"5% center",
          scrub: true,
          // markers:{
          //   startColor: "red",
          //   endColor: "red",
          //   fontSize: "2rem",
          // },
          invalidateOnResize:true,
          onUpdate: function onUpdate(self) {
            requestAnimationFrame(function () {
              gsapWithCSS.set(videoCont, {
                width:videoContW,
                height:videoContH,
                left:videoContL,
                top:videoContT,
                // opacity:0
              });
            })
          }
        })
        ScrollTrigger.create({
          trigger:$zoomInSec,
          start: window.innerWidth < 769 ? "15% center" :"5% center",
          start: "15% center", 
          end:"center center",
          scrub: true,
          // markers: true,
          // markers:{
          //   startColor: "blue",
          //   endColor: "blue",
          //   fontSize: "1rem",
          // },
          invalidateOnResize:true,
          // animation:mainZoomInTimeline,
          onUpdate: function onUpdate(self) {
            requestAnimationFrame(function () {
  
              let progress = self.progress;
              let toWidth = window.innerWidth;
              let toHeight = window.innerHeight;
              let fromWidth = videoContW;
              let fromHeight = videoContH;
              let width = fromWidth + (toWidth - fromWidth) * progress;
              let height = fromHeight + (toHeight - fromHeight) * progress;
              let toLeft = 0;
              let fromLeft = videoContL ;
              let left = fromLeft + (toLeft - fromLeft) * progress;
              let toTop = 0;
              let fromTop = videoContT;
              let top = fromTop + (toTop - fromTop) * progress;
              gsapWithCSS.set(videoCont, {
                width:width,
                height:height,
                left:left,
                top:top,
                // opacity:1
              });
            })
          }
        })
        ScrollTrigger.create({
          trigger:$zoomInSec,
          start: "center center", 
          end:"bottom center",
          scrub: true,
          // markers:{
          //   startColor: "green",
          //   endColor: "green",
          //   fontSize: "2rem",
          // },
          invalidateOnResize:true,
          animation:mainZoomInTimeline,
         
        })
        ScrollTrigger.create({
          trigger:$zoomInSec,
          start: "5% center", 
          end:"bottom center",
          scrub: true,
          // markers:{
          //   startColor: "red",
          //   endColor: "red",
          //   fontSize: "3rem",
          // },
          invalidateOnResize:true,
          onEnter: playVideo,
          onLeave: pauseVideo,
          onEnterBack: playVideo,
        })
  
    }
    
    init()

  }
}