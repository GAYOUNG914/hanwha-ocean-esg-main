import * as state from './state';
import Swiper from 'swiper';
import { Autoplay, Scrollbar } from 'swiper/modules';
import 'swiper/scss';
import { $footer } from './common';

export function media(){
  const $media = document.querySelector('#MAINNEWS');
  function init(){
    let feedSwiper2 = document.querySelector('#MAINNEWS .feedSwiper').slider;

    function mainswiperinit(){
      feedSwiper2 = new Swiper('.feedSwiper',{
        modules:[Scrollbar],
        direction: 'horizontal',
        navigation: false,
        slidesPerView: 'auto',
        // spaceBetween: 48,
        scrollbar: {
          el: '.feedSwiper .swiper-scrollbar',
          draggable: true,
        },
        breakpoints: {
          
          320: {
            spaceBetween: 20,
            slidesOffsetAfter:0,
            scrollbar: {
              dragSize: 80,
            },
          },
          769: {
            spaceBetween: 28,
          },
          1024: {
            spaceBetween: 32,
            scrollbar: {
              dragSize: 250,
            },
          },
          1200: {
            spaceBetween: 48,
            scrollbar: {
              dragSize: 250,
            },
          },
        },
      })  
    }mainswiperinit();

  

    function newsTabInit(){
      const $newsTab = document.querySelectorAll('#MAINNEWS .tab-looking-a a');
      const $feedSwipers = document.querySelectorAll('#MAINNEWS .feedSwiper');
      if($newsTab){
        for(let i = 0; i < $newsTab.length; i++){
          $newsTab[i].addEventListener('click', function(){
            const $this = this;
            $newsTab.forEach(function(el){
              el.classList.remove('active');
              for(let a of $feedSwipers){
                a.classList.remove('active');
              }
              for(let a of feedSwiper2){
                a.destroy();
              }
            })
            $this.classList.add('active');
            $feedSwipers[i].classList.add('active');
            mainswiperinit();
          })
        }
      }
    }newsTabInit();
  }

  if($media){
    init()
  }
}