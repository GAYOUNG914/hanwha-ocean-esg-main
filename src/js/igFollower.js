import gsap from 'gsap';
import {contentId} from './common';
import { Tab } from './tab';

export function igFollower(){

  const $igFacilTab = document.querySelector(`#${contentId} .tab-looking-a`);
  new Tab($igFacilTab);

  const followers = document.querySelectorAll('.follower');
  

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const igLists = document.querySelectorAll('ol.item-list');
    const value = window.innerWidth >= 1920 ? 200 : 200*window.innerWidth/1920;
    const olPaddingTop = window.innerWidth <= 768 ? 0 : value;

    for(let igList of igLists){
      const totalH = igList.getBoundingClientRect().height;
      const startTop = igList.querySelectorAll('li')[0].getBoundingClientRect().top;
      const startPoint = startTop + scrollY; //start 고정값
      const endPoint = startPoint + totalH;//end 고정값
      const process = -(startTop - window.innerHeight/2) / totalH;

      for(let follower of followers){
        if(scrollY > startPoint - window.innerHeight/2 && scrollY < endPoint - window.innerHeight/2){
          
          if(process * totalH > olPaddingTop){
            gsap.to(follower, {y: process * totalH})
          }else{
            gsap.to(follower, {y: olPaddingTop})
          }
        }
        
        if(scrollY < startPoint - window.innerHeight/2){
          gsap.to(follower, {y: olPaddingTop})
        }

        if(scrollY > endPoint - window.innerHeight/2){
          gsap.to(follower, {y: totalH})
        }
      }

    }

  })
}

if(contentId == 'WWA-IG-PLANT' || contentId == 'WWA-IG-SHIP') {
  igFollower();
}