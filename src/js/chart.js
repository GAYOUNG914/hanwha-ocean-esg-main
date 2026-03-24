export function chart(chartElm,reStart){

    if(reStart == undefined){

        //clickable 이 false 일때 페이지 읽었을때 모든 차트들을 불러오기
        const chartWrapper = document.querySelectorAll(".common-chart-wrap");

        const chartObserve = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { 
                    setTimeout(()=>{
                        chartInit(entry.target)
                    },1000)
                }
            });
        },{threshold: 0.3} );
        chartWrapper.forEach((chartWrap)=>{
            chartObserve.observe(chartWrap);
        })

    }else if(chartElm && reStart){//특정 요소가 다시 시작된다면
        //초기화
        chartReset(chartElm)
        //Chart 애니메이션 재시작
        chartInit(chartElm)
       
    }else{
        // console.log('chart(),파라미터 오류');
        return
    }

}

function chartReset(chartWrap){
   const boxs = chartWrap.querySelectorAll('.graph .box');

   boxs.forEach((box)=>{
    let count = box.querySelector('.count')
    let bar = box.querySelector('.bar')
    count.style.opacity = '0';
    count.style.transition = '';
    bar.style.height = '0';
    bar.style.transition = '';
   })
}
function chartInit(chartWrap){
 
    setChartRate(chartWrap)
    window.addEventListener('resize',()=>{setChartRate(chartWrap)});

}
function setChartRate(chartWrap){

    const values = chartWrap.querySelector('.chart-graph .board-box .values');
    const valueMax = chartWrap.querySelector('.chart-graph .board-box .values .val-max');
    const valueMin = chartWrap.querySelector('.chart-graph .board-box .values .val-min');
    const dataBox = chartWrap.querySelector('.chart-graph .data-box');

    const boardHei = values.clientHeight;
    const maxUnitVal = valueMax.getAttribute('data-value')
    const maxUnit = Number(maxUnitVal.replace(/,/g, ''));
    const countAll = dataBox.querySelectorAll('.count')
    let countArr = []

    //최대 수치 구하기
    countAll.forEach((count) => {
       const countVal = Number(count.innerText.replace(/,/g, ''));
       countArr.push(countVal);  
    });

    if(valueMin){
        const minUnitVal = valueMin.getAttribute('data-value')
        const minUnit = Number(minUnitVal.replace(/,/g, ''));
        chartRatio(chartWrap,boardHei,maxUnit,minUnit)
    }else{
        chartRatio(chartWrap,boardHei,maxUnit,)
    }


}
function chartRatio(chartWrap,boardHei,maxVal,minVal){

    const dataWrap = chartWrap.querySelectorAll('.chart-graph .data-box .data-wrap');

    dataWrap.forEach((years,time)=>{
        let year = years.getAttribute('data-graph-year');
        let yearBars = years.querySelectorAll('.graph .box')

        setTimeout(()=>{//년도별 애니메이션 딜레이
            yearBars.forEach((bars,idx)=>{
                let bar = bars.querySelector('.bar');
                let count = bars.querySelector('.count');
                
                let barUnit = count.innerText;
                let barVal = Number(barUnit.replace(/,/g, ''))



                //계산식
                let barCaleVal = (barVal / maxVal) * boardHei;
                if(minVal !== undefined){//최소수치가 0 이아닐경우
                    barCaleVal = ((barVal - minVal) / (maxVal - minVal)) * boardHei;
                   
                }else if(barVal == 0){//막대그래프 수치가 0일경우 
                    barCaleVal == 0;
                }
                
                setTimeout(()=>{//해당연도 애니메이션 딜레이
                    chartAni(bar,count,barCaleVal)
                },idx*100)
                
                })

        },time*200)

    })

}
function chartAni(bar,num,hight){
    bar.style.height=`${hight}px`; 
    bar.style.transition = `all .6s ease-out`;
    num.style.opacity = 1;
    num.style.transition = `all .3s .3s ease-out`;
}






