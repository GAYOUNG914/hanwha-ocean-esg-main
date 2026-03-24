import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {odometerBase} from './odometer';
import * as state from './state';
import { odometerInit } from './odometerInit';
export const $host = document.querySelector('#HOST2030');

export function host2030() {

    odometerBase();
    gsap.registerPlugin(ScrollTrigger);

    const $esgCt = document.querySelector('#HOST2030 .esg-ct');
    const $esgItem = document.querySelectorAll('#HOST2030 .esg-item');
    const $esgBox = document.querySelectorAll('#HOST2030 .esg-box');
    const $targetWrap = $esgCt.querySelectorAll('#HOST2030 .target');
    let esgTimeLine,esgTimeLineM ;
    let winWidth,winMedia;
    let bgMaxHei;

    function onEsgMotion(){

        state.on('mediachange', (media) => {
            //함수 초기화 
            ScrollTrigger.update();
            ScrollTrigger.refresh();
    
        });

        ScrollTrigger.matchMedia({
                    
            "(min-width: 769px)": function() {

                let items = gsap.utils.toArray($esgItem);
                esgTimeLine = gsap.timeline();

                //인터렉션 초기화
                if(esgTimeLine){
                    esgTimeLine.seek(0)
                    esgTimeLine.restart();

                    items.forEach((item)=>{
                        txtInMotion(item,'out')
                        dataInMotion(item,'out')
                        bgInMotion(item,'out')
                        cateInMtion(item,'out')
                    })

                    let odometerGp = document.querySelectorAll('.common-odometer')
                    odometerGp.forEach((odometer)=>{
                    odometerInit(odometer,false);
                    })

                }

                items.forEach((item, idx) => {

                    let odometerGp = items[idx].querySelectorAll('.common-odometer')
        
                    if(idx == 0){
                        
                        item.style.zIndex = 1;
                        txtInMotion(items[idx],'in')
                        cateInMtion(items[idx],'in')

                        esgTimeLine.to(item,{
                            onStart:()=>{
                                dataInMotion(item,'in',1)
                                bgInMotion(item,'in',1.2)

                                odometerGp.forEach((odometer)=>{
                                   odometerInit(odometer,true); 
                                })
                            },
                            onReverseComplete:()=>{
                                dataInMotion(item,'out',0.3)
                                bgInMotion(item,'out',0.3)
                                odometerGp.forEach((odometer)=>{
                                    odometerInit(odometer,false); 
                                })
                             
                            }
                        });
                    }
                    if(idx !== 0){
                        esgTimeLine.to(item,{
                            onStart:()=>{
                                item.style.zIndex = idx + 1;
                                let prevOdometerGp = items[idx - 1].querySelectorAll(".common-odometer")
                                //비활성화 및 초기화 
                                txtInMotion(items[idx - 1],'out',0.3)
                                dataInMotion(items[idx - 1],'out',0.3)
                                bgInMotion(items[idx - 1],'out',0.3)
                                cateInMtion(items[idx - 1],'out',0.3)
                                prevOdometerGp.forEach((prevOdometer)=>{
                                    odometerInit(prevOdometer,false); 
                                })

                                //활성화
                                txtInMotion(item,'in',1)
                                dataInMotion(item,'in',1)
                                bgInMotion(item,'in',1.2)
                                cateInMtion(item,'in',1)
                                odometerGp.forEach((odometer)=>{
                                    odometerInit(odometer,true); 
                                })
        
                            },
                            onReverseComplete:()=>{
                                item.style.zIndex = 0;
                                let prevOdometerGp = items[idx - 1].querySelectorAll(".common-odometer")

                                //비활성화
                                txtInMotion(item,'out',0.3)
                                dataInMotion(item,'out',0.3)
                                bgInMotion(item,'out',0.3)
                                cateInMtion(item,'out',0.3)
                                prevOdometerGp.forEach((prevOdometer)=>{
                                    odometerInit(prevOdometer,true); 
                                })

                                //활성화
                                txtInMotion(items[idx - 1],'in',1)
                                dataInMotion(items[idx - 1],'in',1)
                                bgInMotion(items[idx - 1],'in',1)
                                cateInMtion(items[idx - 1],'in',1)
                                odometerGp.forEach((odometer)=>{
                                    odometerInit(odometer,false); 
                                })

                             
                            
                            }
                        });
                    }
                
        
                });
        
                ScrollTrigger.create({
                    trigger:$esgCt,
                    start:"top top",
                    end: `+=${100 * items.length}% center`,
                    scrub: true,
                    pin: true,
                    pinSpacer: false,
                    invalidateOnResize: true,
                    animation: esgTimeLine,
                    // markers:{
                    //     startColor: "red",
                    //     endColor: "red",
                    // },
                })
            
            },
            "(max-width: 768px)": function() {

                let boxs = gsap.utils.toArray($esgBox);
                esgTimeLineM = gsap.timeline();
              
                if(esgTimeLineM){
                    esgTimeLineM.seek(0)
                    esgTimeLineM.restart();

                    boxs.forEach((box)=>{
                        dataInMotion(box,'out')
                        bgInMotion(box,'out')
                    })
                    let esgItem = document.querySelectorAll('.esg-item')
                    esgItem.forEach((item)=>{
                        cateInMtion(item,'out')
                        txtInMotion(item,'out')
                      })
                     let odometerGp = document.querySelectorAll('.common-odometer')
                      odometerGp.forEach((odometer)=>{
                        odometerInit(odometer,false);
                      })

                }

                boxs.forEach((box, idx) => {

                    let odometerGp = boxs[idx].querySelectorAll('.common-odometer')
                    let item = boxs[idx].parentNode;
                    //gsap.set(item,{zIndex:0})
        
                    if(idx == 0){
                        item.style.zIndex = 1;
                        txtInMotion(item,'in');
                        cateInMtion(item,'in')

                        esgTimeLineM.to(box,{
                            onStart:()=>{
                                dataInMotion(box,'in',1)
                                bgInMotion(box,'in',1.2)
                                odometerGp.forEach((odometer)=>{
                                    odometerInit(odometer,true); 
                                })
                            },
                            onReverseComplete:()=>{
                                dataInMotion(box,'out',0.3)
                                bgInMotion(box,'out',0.3)
                                odometerGp.forEach((odometer)=>{
                                    odometerInit(odometer,false); 
                                })
                            }
                        });
                    }
                    if(idx !== 0){

                        esgTimeLineM.to(box,{
                            onStart:()=>{
                                item.style.zIndex = idx + 1
                                let prevOdometerGp = boxs[idx - 1].querySelectorAll(".common-odometer")
                                let prevItem = boxs[idx -1].parentElement;

                                txtInMotion(prevItem,'out',0.3);
                                dataInMotion(boxs[idx -1],'out',0.3)
                                bgInMotion(boxs[idx - 1],'out',0.3)
                                cateInMtion(prevItem,'out',0.3)
                                prevOdometerGp.forEach((prevOdometer)=>{
                                    odometerInit(prevOdometer,false); 
                                })
                              
                                txtInMotion(item,'in',1);
                                dataInMotion(box,'in',1)
                                bgInMotion(box,'in',1.2)
                                cateInMtion(item,'in',1)
                                odometerGp.forEach((odometer)=>{
                                    odometerInit(odometer,true); 
                                })
                               
                            },
                            onReverseComplete:()=>{//다시 위로 갈때
                                item.style.zIndex = 0;
                                let prevOdometerGp = boxs[idx - 1].querySelectorAll(".common-odometer")
                                let prevItem = boxs[idx -1].parentElement;

                                txtInMotion(item,'out',0.3);
                                dataInMotion(box,'out',0.3)
                                bgInMotion(box,'out',0.3)
                                cateInMtion(item,'out',0.3)
                                prevOdometerGp.forEach((prevOdometer)=>{
                                    odometerInit(prevOdometer,true); 
                                })

                                txtInMotion(prevItem,'in',1);
                                dataInMotion(boxs[idx -1],'in',1)
                                bgInMotion(boxs[idx - 1],'in',1.2)
                                cateInMtion(prevItem,'in',1)
                                odometerGp.forEach((odometer)=>{
                                    odometerInit(odometer,false); 
                                })


                            }
                        });
                    }
        
                });
        
                ScrollTrigger.create({
                    trigger:$esgCt,
                    start:"top top",
                    end: `+=${100 * boxs.length}% center`,
                    scrub: true,
                    pin: true,
                    pinSpacer: false,
                    invalidateOnResize: true,
                    animation: esgTimeLineM,
                    // markers:{
                    //     startColor: "red",
                    //     endColor: "red",
                    // },
                })
            

            },
        });

    }
    function bgRatioCale(targetHei,maxHei){
        let  targetBgHei = (targetHei / maxHei) * 100; 
        return targetBgHei
    }
    function txtInMotion(item,toggle,duration,delay){

        if(duration == null) duration = 0;
        if(delay == null) delay = 0;

        let txtAll = item.querySelectorAll('.tit-wrap p>span')

        if(txtAll.length > 0){
            if(toggle == 'in'){
                txtAll.forEach((txt)=>{
                    txt.style.transform = `translateY(0%)`;
                    txt.style.transition = `transform ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
                })
            }else if(toggle == 'out'){
                txtAll.forEach((txt)=>{
                    txt.style.transform = `translateY(100%)`;
                    txt.style.transition = `transform ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
                })
            }
        }else{
           return
        }

    }
    function cateInMtion(item,toggle,duration,delay){

        if(duration == null) duration = 0;
        if(delay == null) delay = 0;

        let bgTxt = item.querySelector('.bg-txt')

        if(toggle == 'in'){
            bgTxt.style.opacity = `100%`;
            bgTxt.style.transition = `opacity ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
        }
        if(toggle == 'out'){
            bgTxt.style.opacity = `0%`;
            bgTxt.style.transition = `opacity ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
        }

    }
    function dataInMotion(item,toggle,duration,delay){

        if(duration == null) duration = 0;
        if(delay == null) delay = 0;

        let target = item.querySelectorAll('.data-wrap .target')
        let txtAll = item.querySelectorAll('.data-wrap p>span')

        if(target){
            if(toggle == 'in'){
                target.forEach((data)=>{
                    data.style.opacity = `100%`;
                    data.style.transform = `translateY(0%)`;
                    data.style.transition = `all ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
                })
                txtAll.forEach((txt)=>{
                    txt.style.transform = `translateY(0%)`;
                    txt.style.transition = `transform ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
                })
            }else if(toggle == 'out'){
                target.forEach((data)=>{
                    data.style.opacity = `0%`;
                    data.style.transform = `translateY(100%)`;
                    data.style.transition = `all ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
                })
                txtAll.forEach((txt)=>{
                    txt.style.transform = `translateY(100%)`;
                    txt.style.transition = `transform ${duration}s ${delay}s cubic-bezier(0.67, 0.11, 0.39, 0.97)`;
                })
            }

        }
    }
    function bgInMotion(item,toggle,duration,delay){

        if(duration == null) duration = 0;
        if(delay == null) delay = 0;

        let esgBoxs = item.querySelectorAll('.esg-box')

        if(esgBoxs.length > 0){
            esgBoxs.forEach((box)=>{
                bgGraphAni(box,toggle,duration,delay)
            })
        }else{
            bgGraphAni(item,toggle,duration,delay)
        }


    }
    function bgGraphAni(box,toggle,duration,delay){

        let bgGraph = box.querySelector('.bg-img')//배경
        let target = box.querySelector('.target')//데이터

        let targetData;
        if(winMedia == 'mobile'){
            targetData = target.getAttribute('data-moHei');
            
        }else{
            targetData = target.getAttribute('data-pcHei')
          
        }
        let targetValue = parseFloat(targetData);
        let titWrap = box.parentElement.querySelector('.tit-wrap');//
        let bgTxt = box.parentElement.querySelector('.bg-txt');//

        let height = bgRatioCale(targetValue,bgMaxHei);

        //그래프 애니메이션
        if(toggle == 'in'){

            //텍스트 색 변경 - pc
            if(height > 30 && box.classList.contains("target-box")){
                box.classList.add('white')
            }

            //텍스트 색 변경 - mo
            if(height >= 100 && winMedia == 'mobile'){
                titWrap.classList.add('white');
            }else{
                titWrap.classList.remove('white');
            }

            //bg 텍스트 색 변경 - mo
            if(box.classList.contains('info-box') && height > 50 && winMedia == 'mobile'){//임의로
                bgTxt.classList.add('deep');
            }else{
                bgTxt.classList.remove('deep');
            }

            bgGraph.style.height = `${height}%`;
            bgGraph.style.transition = `all ${duration}s ${delay}s cubic-bezier(.55,.09,.21,.91)`;

        }else if(toggle == 'out'){

            bgGraph.style.height = 0;
            bgGraph.style.transition = `all ${duration}s ${delay}s cubic-bezier(.55,.09,.21,.91)`;

            setTimeout(()=>{
                box.classList.remove('white');
            },duration*1000)

            if(height < 100 && winMedia == 'mobile'){
                titWrap.classList.remove('white');
            }

            if(!box.classList.contains('info-box') && height < 50 && winMedia == 'mobile'){
                bgTxt.classList.remove('deep');
            }
          
        }

    }

    function onEventResize(){

        winWidth = window.innerWidth;

        if(winWidth<1201 && winWidth >= 1024) winMedia = 'laptop';
        else if(winWidth<1024 && winWidth > 768) winMedia = 'tablet';
        else if(winWidth<=768 ) winMedia = 'mobile'; 
        else  winMedia = 'desktop';

    }
    function init(){
        state.on('mediachange', (media) => { 
            bgMaxHei = (media !== 'mobile') ? 1080 : 812;
        });
        onEsgMotion();
        onEventResize();
    }
    
    window.addEventListener('load',init())
    window.addEventListener('resize', onEventResize);
   

}
if($host) host2030();
