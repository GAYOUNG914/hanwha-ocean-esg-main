
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function parallax(_target, percent){


  function init(){
    parallaxInit(_target);
  }
  const parallaxInit = function(_target){

    const $img = _target;

    gsap.to($img, {
        yPercent: percent,
        duration: 0.5,
        ease: "none",
        force3D:true,
        scrollTrigger: {
            trigger: $img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // markers:true
        }, 
    });

  }
  init()
}