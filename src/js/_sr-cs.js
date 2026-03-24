import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
export const $CS = document.querySelector('#CS');

export function srcs() {

  gsap.registerPlugin(ScrollTrigger);

  const $socialProcessWrap = $CS.querySelector(".social-process-wrap");
  const $socialProcessImg = $socialProcessWrap.querySelector(".social-process-img");
  const $iconSwipe = $CS.querySelector(".icon-swipe");

  function setScrollTrigger () {
    ScrollTrigger.matchMedia({
      "(max-width: 768px)": function() {
        // 스와이프 아이콘
        gsap.to($iconSwipe, {
          scrollTrigger: {
            trigger: $socialProcessImg,
            start: "0% 100%",
            end: "100% 0%",
            onEnter: () => $iconSwipe.classList.add('on'),
            onLeave: () => $iconSwipe.classList.remove('on'),
            onEnterBack: () => $iconSwipe.classList.add('on'),
            onLeaveBack: () => $iconSwipe.classList.remove('on'),
          }
        })
      }

    })
  }

  function setMobileScroll () {
  
    const scrollX = (($socialProcessImg.getBoundingClientRect().width - $socialProcessWrap.getBoundingClientRect().width) / 2) + 20;

    if (window.innerWidth <= 768) {
      $socialProcessWrap.scrollLeft = scrollX;
    }
  }


  function init() {
    setScrollTrigger()
    setMobileScroll()
  }


  window.addEventListener('load', init())
  window.addEventListener('resize', setMobileScroll())
}
if ($CS) srcs();
