import * as state from './state';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export const $RS = document.querySelector('#RS');

export function RS() {

  const pictureNormal = $RS.querySelector('.picture.nontouch');
  const pictureMobileOnly = $RS.querySelector('.picture.touch-only');

  pictureNormal.style.display = 'block';
  pictureMobileOnly.style.display = 'none';

  const lightbox = new PhotoSwipeLightbox({
    bgOpacity: 0.6,
    // closeSVG: '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_b_1339_30352)"><circle cx="18" cy="18" r="18" fill="#151515" fill-opacity="0.4"/></g><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9985 13.1533L13.1518 12L18 16.8482L22.8483 12L24.0015 13.1533L19.1533 18.0015L23.9985 22.8467L22.8452 24L18 19.1548L13.1548 24L12.0015 22.8467L16.8468 18.0015L11.9985 13.1533Z" fill="white"/><defs><filter id="filter0_b_1339_30352" x="-104" y="-104" width="244" height="244" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="52"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1339_30352"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1339_30352" result="shape"/></filter></defs></svg>',
    gallery: '#gallery',
    children: 'a',

    pswpModule: () => import('photoswipe')
  });

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  function resize(){
    if (isTouchDevice() || state.states.media === 'mobile') {
      pictureNormal.style.display = 'none';
      pictureMobileOnly.style.display = 'block';
  
      $RS.querySelector('#gallery').addEventListener('touchstart', function(e) {
          e.preventDefault();
          lightbox.init();

      }, {passive: true});

    }else{
      pictureNormal.style.display = 'block';
      pictureMobileOnly.style.display = 'none';
    }
  }
  resize();

  window.addEventListener('touchstart', (e)=>{
    if(document.querySelector('.pswp--open') && e.target.classList.contains('pswp__item')){
      //닫힘
      lightbox.pswp.close();
    }
  })

  window.addEventListener('resize', resize)
}
if ($RS) RS();


