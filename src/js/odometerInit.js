import gsap from 'gsap';
import {odometerBase} from './odometer';
export function odometerInit(odometerData,stats){

      //odometer----------------------
     odometerBase();
     odometerSet(odometerData,stats);

     //오도미터 호출시 호출할 페이지에도 odometerBase(); 넣어줘야합니다 

}
let isCreated = false;

function odometerSet(odometerData,stats){

    if(stats === undefined){
        stats = true
    }

    if(odometerData){

        let maxData = odometerData.querySelector('.odometer-auto-theme');
        let floatWrap = odometerData.querySelector(".odometer-float");//실수 wrap
        let stringWrap = odometerData.querySelector(".odometer-txt");//문자 wrap
        const targetData = odometerData.querySelector('.odometer-tobe');
        const targetCon = parseFloat(targetData.textContent);


        if(stats){
           
            if(Number.isNaN(targetCon) && stringWrap){//문자인경우

                const odometerInSide = maxData.querySelector('.odometer-inside')

               //숫자 카운트 필요없으니 삭제
               if(maxData.textContent){
                    odometerInSide.innerHTML=''
               }

               const targetStr = targetData.textContent;
               const targetArray = targetStr.split("");

               targetArray.forEach((str,idx)=>{
                    let strElem = document.createElement('div');
                    strElem.classList.add('odometer-str');
                    strElem.innerHTML = str;
                    odometerInSide.appendChild(strElem); 
                    gsap.fromTo(strElem, {y:"100%"}, {y:0, duration:1.2, delay:idx*.4, ease:'power2.out',})
                });

            }else{//숫자 인 경우

                if(!Number.isInteger(targetCon) && floatWrap){//실수 && 실수의 정수가 0인 경우 

                    let zeroElem = floatWrap.querySelector(".odometer-zero");
                    if(zeroElem){//실수의 정수인 0 애니메이션
                        gsap.fromTo(zeroElem, {y:'100%'}, {y:0, duration:1.2, delay:0.3, ease:'power2.out',})
                    }

                }

                let odometer = new Odometer({
                    el: maxData,
                    duration: 1200,
                    format: '(.ddd).dd',
                });

                odometer.update(targetCon);

               
               
            }

        }else{
            
            //초기화
            if(Number.isNaN(targetCon) && stringWrap){//문자인경우

                const odometerInSide = maxData.querySelector('.odometer-inside')
                if(maxData.textContent){
                        odometerInSide.innerHTML = 0;
                }

                let strElem = stringWrap.querySelectorAll('.odometer-str');
                strElem.forEach((str,idx)=>{
                    gsap.fromTo(str,{y:0},
                        {y:"100%",delay:idx*.4,onComplete: () => {
                           str.remove();
                         }}
                    )
                })
 
             }else{

                if(!Number.isInteger(targetCon) && floatWrap){//실수 && 실수의 정수 부분이 0인 경우 
                    let zeroElem = floatWrap.querySelector('.odometer-zero');
                    if(zeroElem){//실수의 정수 0 위치 초기화
                        gsap.fromTo(zeroElem,{y:0},{y:"100%"})
                    }
                }

                maxData.innerHTML = 0//초기화
    

             }

            
           

        }


    }
   

}

