
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import { accordion } from './accordion.js';
import { chart } from './chart';

export const $hseEnv = document.querySelector('.env .hse-area');

export function Env() {

    const $accordion = $hseEnv.querySelector('.common-accordion-list');
    const $chart = $hseEnv.querySelector('.common-chart-wrap');
    const $swiper = $hseEnv.querySelectorAll('.swiper');

    const swipers = [];

    const defaultOptions = {
        modules:[Autoplay],//모듈 선언 
        autoplay:{
            delay:5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        allowTouchMove:true,
        // loop:true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    }

    function slideSet(){
        for(let i = 0; i < $swiper.length; i++){
            let slideTotal = $swiper[i].querySelectorAll('.swiper-slide').length;
            let slidePagin = $swiper[i].querySelector('.swiper-pagination')
       
            accSwiperDestory($swiper[i]);

            if(slideTotal > 1) {
                accSwiperSet($swiper[i], i)
            }else{
                slidePagin && (slidePagin.style.display = 'none');
            }
        }

    }

    //swiper set
    function accSwiperDestory(slideWrap){
        if(slideWrap.swiper){
            slideWrap.swiper.destroy(); 
        }
    }
    function accSwiperSet (slideWrap, index){
        const options = Object.assign(defaultOptions, {
            pagination: {
                el: slideWrap.querySelector(".swiper-pagination"),
                clickable: true,
            },
            navigation: {
                nextEl: slideWrap.closest('.slide').querySelector(".swiper-button-next"),
                prevEl: slideWrap.closest('.slide').querySelector(".swiper-button-prev"),
            },
        })
        swipers[index] = new Swiper(slideWrap, options);
        swipers[index].autoplay.stop();

        if ( slideWrap.closest('.common-accordion-list') ) {
            const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if ( mutation.target.classList.contains('open') ) {
                    swipers[index].autoplay.start();
                } else {
                    swipers[index].autoplay.stop();
                    swipers[index].slideTo(0);
                }
            }
            };
            const observer = new MutationObserver(callback);
            observer.observe(slideWrap.closest('li').querySelector('.head'), {attributes: true});
        }
    }

    function init(){

        if($swiper){slideSet();}
        if($accordion) new accordion({ accordionElem: $accordion })
        if($chart){ chart()}
    
    }

    window.addEventListener('load',init())
    //window.addEventListener('resize', onEventResize);

}
if($hseEnv) Env();








