import Lenis from "@studio-freight/lenis";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export let lenis 
export let lenisOp = {
  duration: 1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
}
export function smooth(_op) {
    lenis = new Lenis(_op);

    // function raf(time) {
    //     lenis.raf(time)
    //     requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);

    lenis.on("scroll", (e) => {
      ScrollTrigger.update
        // console.log(e);
    })
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
}