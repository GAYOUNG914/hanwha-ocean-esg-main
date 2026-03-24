
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import { activeIndex } from './common';

export const $news = document.querySelector('#NEWS');

export function News() {


    const $feedWrap = document.querySelector('#NEWS .feed-wrapper');
    let winWidth;
    let winMedia;

    const defaultOptions = {
        modules:[Autoplay],//모듈 선언 
        autoplay:{
            delay:5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        allowTouchMove:false,
        loop:true,
        on:{
            slideChange:function(){
                let onSlides = this.slides;

                for(let i = 0; i < onSlides.length; i++){
                    onSlides[i].style.zIndex = 'initial';
                }
                onSlides[this.activeIndex].style.zIndex = onSlides.length;
            }
        }
    }
    function init(){
       
        onEventResize()
        feedSlideChk()
    
    }
    //slide check
    function feedSlideChk(media){
      
        if(media !== undefined){
            let  feedSwiper = document.querySelectorAll('.feed-item .newFeedSwiper');
            for(let i = 0; i < feedSwiper.length; i++){
                let slideTotal = feedSwiper[i].querySelectorAll('.swiper-slide').length;
           
                feedSwiperDestory(feedSwiper[i]);
                if(slideTotal > 1 && media !== 'mobile') feedSwiperSet(feedSwiper[i])
            }
        }
       
    }
    //swiper set
    function feedSwiperDestory(slideWrap){
        if(slideWrap.swiper){
            slideWrap.swiper.destroy(); 
           
        }
    }
    function feedSwiperSet (slideWrap){

       //console.log('swiper set')
        new Swiper(slideWrap, defaultOptions);
    }
    function onChangeNews(media){

        if ($feedWrap) {
            const $feedPagin = $feedWrap.querySelector('.feed-paginate');
            const $feedMore = $feedWrap.querySelector('.feed-more');
            
            if (media === 'mobile') {
                $feedPagin.classList.add('none');
                $feedMore.classList.remove('none');
            } else {
                $feedPagin.classList.remove('none');
                $feedMore.classList.add('none');
            }
        } else {
            return;
        }

    }
    function onEventResize(){

        winWidth = window.innerWidth;

        if(winWidth<1201 && winWidth >= 1024) winMedia = 'laptop';
        else if(winWidth<1024 && winWidth > 768) winMedia = 'tablet';
        else if(winWidth<=768 ) winMedia = 'mobile'; 
        else  winMedia = 'desktop';

        feedSlideChk(winMedia);
        onChangeNews(winMedia);

    }
  
 

    window.addEventListener('load',init())
    window.addEventListener('resize', onEventResize);


}
if($news) News();








