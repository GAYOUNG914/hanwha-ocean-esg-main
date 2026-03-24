import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs, Scrollbar, Controller } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Thumbs, Scrollbar, Controller]);
import 'swiper/scss';

const $dataPopups = document.querySelectorAll('.tab-conts [data-popup]');

for(let a of $dataPopups){
  if(a){
    a.addEventListener('click', (e)=>{
      slideImgCheck();
    })
  }
}

export function slideImgCheck(){

  let  popupSwiper = document.querySelectorAll('.listPopupSwiper');
  let  popupMainSwiper = document.querySelectorAll('.productSwiperMain');
  let  popupThumbSwiper = document.querySelectorAll('.productSwiperThumb');

    if(popupSwiper){
      for(let i = 0; i < popupSwiper.length; i++){
        if(popupSwiper[i]){
          swiperDestory(popupSwiper[i]);
        }

        if(popupSwiper[i]){
          swiperSet(popupSwiper[i])
        }
      }
    }

    if(popupMainSwiper){
      for(let i = 0; i < popupMainSwiper.length; i++){

        if(popupMainSwiper[i]){
          swiperDestory(popupMainSwiper[i]);
        }
        // else if(popupThumbSwiper[i]){
        if(popupThumbSwiper[i]){
          swiperDestory(popupThumbSwiper[i]);
        }
        
        if(popupMainSwiper[i]){
          swiperSet(popupMainSwiper[i])
        }
        else if(popupThumbSwiper[i]){
          swiperSet(popupThumbSwiper[i])
        }
      }
    }

}

export function swiperDestory(slideWrap){
  if(slideWrap.swiper){
      slideWrap.swiper.destroy(); 
  }
}

export function swiperSet (slideWrap){

  const pagination = slideWrap.parentNode.querySelector('.swiper-pagination');
  const nextButton = slideWrap.parentNode.querySelector('.swiper-arrows .swiper-button-next');
  const prevButton = slideWrap.parentNode.querySelector('.swiper-arrows .swiper-button-prev');
  const scroll = slideWrap.parentNode.querySelector('.swiper-scrollbar');

  if(slideWrap.parentNode.classList.contains('productSwiper-container')){
    let productSwiperThumb = new Swiper(".productSwiperThumb", {
      watchSlidesProgress: true,
      spaceBetween: 12,
      slidesPerView: 8,
      freeMode: true,
      scrollbar: {
        el: scroll,
        draggable: true,
      },
      breakpoints: {
        320: {
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
          slidesPerView: 'auto',

        },
        769: {
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          slidesPerView: 8,
        },
      },
    });
    // console.log('swiper1')

    let productSwiperMain = new Swiper(".productSwiperMain", {
      centeredSlides: true,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      thumbs: {
        swiper: productSwiperThumb,
      },

    });
    // console.log('swiper2')

    productSwiperMain.on('slideChange', function () {
      productSwiperThumb.slideTo(this.activeIndex);
    });
    
    productSwiperThumb.on('slideChange', function () {
      productSwiperMain.slideTo(this.activeIndex);
    });    

  }else{
    let swiper = new Swiper(slideWrap, {
      centeredSlides: true,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      pagination: {
        el: pagination,
      },
    });
  }
}

window.slideImgCheck = {init:slideImgCheck}